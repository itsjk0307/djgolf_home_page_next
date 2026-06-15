import { SubPageLayout } from "@/components/layout/SubPageLayout";
import { BoardList } from "@/components/board/BoardList";
import { db } from "@/lib/db";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Business.courseManagement" });
  return { title: t("title") };
}

const BOARD_ID = "business";
const PER_PAGE = 18;

export default async function CourseManagementPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; sw?: string }>;
}) {
  const sp = await searchParams;
  const page = Math.max(1, parseInt(sp.page ?? "1", 10));
  const sw = sp.sw ?? "";
  const t = await getTranslations("Business.courseManagement");

  const where = { boardId: BOARD_ID, ...(sw ? { subject: { contains: sw } } : {}) };
  const [posts, total] = await Promise.all([
    db.boardPost.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * PER_PAGE,
      take: PER_PAGE,
      include: { files: { where: { isImage: true }, take: 1 }, _count: { select: { replies: true } } },
    }),
    db.boardPost.count({ where }),
  ]);

  return (
    <SubPageLayout
      title={t("title")}
      breadcrumbs={[{ label: t("breadcrumb") }, { label: t("title") }]}
    >
      <div className="bg-golf-green text-white rounded-xl p-8 mb-8">
        <h2 className="text-xl font-bold mb-3">{t("bannerTitle")}</h2>
        <p className="text-green-200 leading-relaxed text-sm">{t("bannerDesc")}</p>
      </div>
      <BoardList boardId={BOARD_ID} posts={posts} total={total} page={page} basePath="/business/course-management" searchWord={sw} />
    </SubPageLayout>
  );
}
