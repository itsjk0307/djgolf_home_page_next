import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { z } from "zod";

const schema = z.object({
  authorName: z.string().min(1).max(50),
  email: z.string().email(),
  phone: z.string().optional(),
  subject: z.string().min(1).max(200),
  contents: z.string().min(1),
});

export async function POST(req: NextRequest) {
  const session = await auth();
  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const inquiry = await db.oneToOne.create({
    data: {
      ...parsed.data,
      userId: (session?.user as { id?: string })?.id ?? null,
      ip: req.headers.get("x-forwarded-for") ?? "",
    },
  });

  return NextResponse.json(inquiry, { status: 201 });
}

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!(session?.user as { isAdmin?: boolean })?.isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") ?? "1", 10);
  const perPage = 20;

  const [items, total] = await Promise.all([
    db.oneToOne.findMany({
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * perPage,
      take: perPage,
    }),
    db.oneToOne.count(),
  ]);

  return NextResponse.json({ items, total });
}
