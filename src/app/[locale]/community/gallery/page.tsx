import { SubPageLayout } from "@/components/layout/SubPageLayout";
import { db } from "@/lib/db";
import Image from "next/image";
import { formatDate } from "@/lib/utils";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Community.gallery" });
  return { title: t("title") };
}

const BOARD_ID = "gallery";
const PER_PAGE = 12;

export default async function GalleryPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const sp = await searchParams;
  const page = Math.max(1, parseInt(sp.page ?? "1", 10));
  const t = await getTranslations("Community.gallery");
  const tBoard = await getTranslations("Board");

  const [posts, total] = await Promise.all([
    db.boardPost.findMany({
      where: { boardId: BOARD_ID },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * PER_PAGE,
      take: PER_PAGE,
      include: { files: { where: { isImage: true }, take: 1 } },
    }),
    db.boardPost.count({ where: { boardId: BOARD_ID } }),
  ]);

  const totalPages = Math.ceil(total / PER_PAGE);

  return (
    <SubPageLayout
      title={t("title")}
      breadcrumbs={[{ label: t("breadcrumb") }, { label: t("title") }]}
    >
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {posts.length === 0 && (
          <p className="col-span-full text-center py-12 text-gray-400">{tBoard("noImages")}</p>
        )}
        {posts.map((post) => {
          const thumb = post.files[0];
          return (
            <Link
              key={post.id}
              href={`/community/gallery/${post.id}`}
              className="group border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="aspect-square bg-gray-100 relative overflow-hidden">
                {thumb ? (
                  <Image
                    src={`/uploads/${thumb.savedName}`}
                    alt={post.subject}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-gray-300 text-sm">
                    {tBoard("noImages")}
                  </div>
                )}
              </div>
              <div className="p-3">
                <p className="text-sm font-medium text-gray-800 truncate">{post.subject}</p>
                <p className="text-xs text-gray-400 mt-1">{formatDate(post.createdAt)}</p>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="flex justify-center gap-1 mt-8">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <Link
            key={p}
            href={`/community/gallery?page=${p}`}
            className={`w-9 h-9 flex items-center justify-center rounded text-sm ${
              p === page ? "bg-golf-green text-white" : "bg-gray-100 hover:bg-golf-green hover:text-white"
            }`}
          >
            {p}
          </Link>
        ))}
      </div>
    </SubPageLayout>
  );
}
