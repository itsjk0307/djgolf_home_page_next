import { notFound } from "next/navigation";
import { SubPageLayout } from "@/components/layout/SubPageLayout";
import { db } from "@/lib/db";
import { formatDateTime } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Eye, Calendar, User } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Metadata } from "next";

const BOARD_ID = "notice";

export async function generateMetadata({ params }: { params: Promise<{ id: string; locale: string }> }): Promise<Metadata> {
  const { id, locale } = await params;
  const parsedId = parseInt(id, 10);
  const t = await getTranslations({ locale, namespace: "Board" });
  if (isNaN(parsedId)) {
    return { title: t("postFallback") };
  }

  const post = await db.boardPost.findUnique({
    where: { id: parsedId },
    select: { subject: true, boardId: true },
  });
  if (!post || post.boardId !== BOARD_ID) {
    return { title: t("postFallback") };
  }
  return { title: post.subject };
}

export default async function NewsViewPage({ params }: { params: Promise<{ id: string; locale: string }> }) {
  const { id, locale } = await params;
  const parsedId = parseInt(id, 10);
  if (isNaN(parsedId)) notFound();

  const t = await getTranslations({ locale, namespace: "Board" });

  const post = await db.boardPost.findUnique({
    where: { id: parsedId },
    select: {
      id: true,
      boardId: true,
      subject: true,
      contents: true,
      useHtml: true,
      authorName: true,
      createdAt: true,
      hit: true,
      files: { select: { id: true, origName: true } },
    },
  });
  if (!post || post.boardId !== BOARD_ID) notFound();

  await db.boardPost.update({
    where: { id: parsedId },
    data: { hit: { increment: 1 } },
  });

  const [prevPost, nextPost] = await Promise.all([
    db.boardPost.findFirst({
      where: { boardId: BOARD_ID, id: { lt: parsedId } },
      orderBy: { id: "desc" },
      select: { id: true, subject: true },
    }),
    db.boardPost.findFirst({
      where: { boardId: BOARD_ID, id: { gt: parsedId } },
      orderBy: { id: "asc" },
      select: { id: true, subject: true },
    }),
  ]);

  const tCommunity = await getTranslations({ locale, namespace: "Community.news" });

  return (
    <SubPageLayout
      title={tCommunity("title")}
      breadcrumbs={[
        { label: tCommunity("breadcrumb") },
        { label: tCommunity("title"), href: "/community/news" },
        { label: post.subject },
      ]}
    >
      <div className="border-t-2 border-golf-green">
        <div className="border-b px-4 py-5">
          <h2 className="text-xl font-bold text-gray-900">{post.subject}</h2>
          <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <User className="w-3.5 h-3.5" />{post.authorName}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />{formatDateTime(post.createdAt)}
            </span>
            <span className="flex items-center gap-1">
              <Eye className="w-3.5 h-3.5" />{post.hit + 1}
            </span>
          </div>
        </div>

        <div
          className="px-4 py-8 min-h-48 text-gray-700 leading-relaxed prose max-w-none"
          dangerouslySetInnerHTML={{ __html: post.useHtml ? post.contents : post.contents.replace(/\n/g, "<br/>") }}
        />

        {post.files.length > 0 && (
          <div className="border-t px-4 py-4">
            <p className="text-sm font-semibold text-gray-700 mb-2">{t("attachments")}</p>
            <ul className="space-y-1">
              {post.files.map((f) => (
                <li key={f.id}>
                  <a href={`/api/boards/download/${f.id}`} className="text-sm text-golf-green hover:underline">
                    {f.origName}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="mt-6 border rounded divide-y text-sm">
        {nextPost && (
          <div className="flex items-center gap-3 px-4 py-3">
            <span className="text-gray-400 flex items-center gap-1 w-20 shrink-0">
              <ChevronLeft className="w-4 h-4" /> {t("prevPost")}
            </span>
            <Link href={`/community/news/${nextPost.id}`} className="hover:text-golf-green truncate">
              {nextPost.subject}
            </Link>
          </div>
        )}
        {prevPost && (
          <div className="flex items-center gap-3 px-4 py-3">
            <span className="text-gray-400 flex items-center gap-1 w-20 shrink-0">
              {t("nextPost")} <ChevronRight className="w-4 h-4" />
            </span>
            <Link href={`/community/news/${prevPost.id}`} className="hover:text-golf-green truncate">
              {prevPost.subject}
            </Link>
          </div>
        )}
      </div>

      <div className="mt-4 text-center">
        <Link
          href="/community/news"
          className="inline-flex items-center gap-2 border border-gray-300 text-gray-600 hover:border-golf-green hover:text-golf-green px-6 py-2 rounded text-sm transition-colors"
        >
          {t("backToList")}
        </Link>
      </div>
    </SubPageLayout>
  );
}
