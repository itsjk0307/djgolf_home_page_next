import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Admin user
  const hashedPw = await bcrypt.hash("admin1234!", 12);
  await prisma.user.upsert({
    where: { userId: "admin" },
    update: {},
    create: {
      userId: "admin",
      password: hashedPw,
      name: "관리자",
      email: "admin@dj-golf.co.kr",
      isAdmin: true,
    },
  });

  // Member levels
  const levels = [
    { levelNo: 1, levelName: "일반회원" },
    { levelNo: 2, levelName: "우수회원" },
    { levelNo: 3, levelName: "VIP회원" },
  ];
  for (const level of levels) {
    await prisma.memberLevel.upsert({
      where: { levelNo: level.levelNo },
      update: {},
      create: level,
    });
  }

  // Board definitions
  const boards = [
    { boardId: "notice", boardName: "대정소식", skin: "default" },
    { boardId: "award", boardName: "수상실적", skin: "gallery" },
    { boardId: "news", boardName: "언론소개", skin: "default" },
    { boardId: "gallery", boardName: "갤러리", skin: "gallery" },
    { boardId: "business", boardName: "코스관리", skin: "gallery2" },
    { boardId: "result1", boardName: "코스관리/위탁운영 실적", skin: "result" },
    { boardId: "golf_construction", boardName: "골프장 공사실적", skin: "result2" },
    { boardId: "general_construction", boardName: "일반 공사실적", skin: "result2" },
    { boardId: "distribution1", boardName: "비료", skin: "distribution" },
    { boardId: "distribution2", boardName: "농약", skin: "distribution" },
    { boardId: "distribution3", boardName: "장비", skin: "distribution" },
    { boardId: "job", boardName: "채용공고", skin: "default" },
  ];

  for (const board of boards) {
    await prisma.boardInfo.upsert({
      where: { boardId: board.boardId },
      update: {},
      create: board,
    });
  }

  console.log("Seed completed.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
