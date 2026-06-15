import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { z } from "zod";

const postSchema = z.object({
  subject: z.string().min(1).max(200),
  contents: z.string().min(1),
  authorName: z.string().min(1).max(50),
  password: z.string().optional(),
  email: z.string().email().optional().or(z.literal("")),
  category: z.string().optional(),
  useHtml: z.boolean().optional(),
  scheduleDate: z.string().optional(),
});

export async function GET(
  req: NextRequest,
  { params }: { params: { boardId: string } }
) {
  const { searchParams } = new URL(req.url);
  const page = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10));
  const perPage = parseInt(searchParams.get("perPage") ?? "15", 10);
  const sw = searchParams.get("sw") ?? "";

  const where = {
    boardId: params.boardId,
    ...(sw ? { subject: { contains: sw } } : {}),
  };

  const [posts, total] = await Promise.all([
    db.boardPost.findMany({
      where,
      orderBy: [{ isNotice: "desc" }, { createdAt: "desc" }],
      skip: (page - 1) * perPage,
      take: perPage,
      select: {
        id: true,
        subject: true,
        authorName: true,
        hit: true,
        isNotice: true,
        isLocked: true,
        createdAt: true,
        _count: { select: { replies: true } },
      },
    }),
    db.boardPost.count({ where }),
  ]);

  return NextResponse.json({ posts, total, page, perPage });
}

export async function POST(
  req: NextRequest,
  { params }: { params: { boardId: string } }
) {
  const session = await auth();
  const body = await req.json();
  const parsed = postSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const board = await db.boardInfo.findUnique({ where: { boardId: params.boardId } });
  if (!board) return NextResponse.json({ error: "Board not found" }, { status: 404 });

  if (board.adminOnly && !session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const post = await db.boardPost.create({
    data: {
      boardId: params.boardId,
      subject: parsed.data.subject,
      contents: parsed.data.contents,
      authorName: parsed.data.authorName,
      password: parsed.data.password,
      email: parsed.data.email || null,
      category: parsed.data.category,
      useHtml: parsed.data.useHtml ?? false,
      userId: (session?.user as { id?: string })?.id ?? null,
      ip: req.headers.get("x-forwarded-for") ?? req.ip ?? "",
    },
  });

  return NextResponse.json(post, { status: 201 });
}
