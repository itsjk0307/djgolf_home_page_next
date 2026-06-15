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
  const t = await getTranslations({ locale, namespace: "Performance.golfConstruction" });
  return { title: t("title") };
}

const BOARD_ID = "golf_construction";
const PER_PAGE = 15;

export default async function GolfConstructionPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; sw?: string }>;
}) {
  const sp = await searchParams;
  const page = Math.max(1, parseInt(sp.page ?? "1", 10));
  const sw = sp.sw ?? "";
  const t = await getTranslations("Performance.golfConstruction");

  const where = { boardId: BOARD_ID, ...(sw ? { subject: { contains: sw } } : {}) };
  const [posts, total] = await Promise.all([
    db.boardPost.findMany({
      where,
      orderBy: [{ isNotice: "desc" }, { createdAt: "desc" }],
      skip: (page - 1) * PER_PAGE,
      take: PER_PAGE,
      include: { files: { select: { isImage: true } }, _count: { select: { replies: true } } },
    }),
    db.boardPost.count({ where }),
  ]);

  return (
    <SubPageLayout
      title={t("title")}
      breadcrumbs={[{ label: t("breadcrumb") }, { label: t("title") }]}
    >
      <div className="bg-golf-green text-white rounded-xl p-6 mb-8">
        <h2 className="text-2xl font-bold mb-2">{t("bannerTitle")}</h2>
        <p className="text-green-200">{t("bannerDesc")}</p>
      </div>
      <BoardList boardId={BOARD_ID} posts={posts} total={total} page={page} basePath="/performance/golf-construction" searchWord={sw} />
    </SubPageLayout>
  );
}
