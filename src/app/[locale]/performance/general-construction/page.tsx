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
  const t = await getTranslations({ locale, namespace: "Performance.generalConstruction" });
  return { title: t("title") };
}

const BOARD_ID = "general_construction";
const PER_PAGE = 15;

export default async function GeneralConstructionPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; sw?: string }>;
}) {
  const sp = await searchParams;
  const page = Math.max(1, parseInt(sp.page ?? "1", 10));
  const sw = sp.sw ?? "";
  const t = await getTranslations("Performance.generalConstruction");

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
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {(["workType1", "workType2", "workType3", "workType4"] as const).map((key) => (
          <div key={key} className="bg-gray-50 rounded-lg p-4 text-center border">
            <p className="font-semibold text-gray-700">{t(key)}</p>
          </div>
        ))}
      </div>
      <BoardList boardId={BOARD_ID} posts={posts} total={total} page={page} basePath="/performance/general-construction" searchWord={sw} />
    </SubPageLayout>
  );
}
