import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import { z } from "zod";

const registerSchema = z.object({
  userId: z.string().min(4).max(20).regex(/^[a-zA-Z0-9_]+$/),
  password: z.string().min(8).max(50),
  name: z.string().min(2).max(30),
  email: z.string().email().optional().or(z.literal("")),
  phone: z.string().optional(),
  birth: z.string().optional(),
  gender: z.string().optional(),
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = registerSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const existing = await db.user.findUnique({ where: { userId: parsed.data.userId } });
  if (existing) {
    return NextResponse.json({ error: "userId_taken" }, { status: 409 });
  }

  const hashed = await bcrypt.hash(parsed.data.password, 12);
  const user = await db.user.create({
    data: {
      userId: parsed.data.userId,
      password: hashed,
      name: parsed.data.name,
      email: parsed.data.email || null,
      phone: parsed.data.phone,
      birth: parsed.data.birth,
      gender: parsed.data.gender,
    },
    select: { id: true, userId: true, name: true, createdAt: true },
  });

  return NextResponse.json(user, { status: 201 });
}
