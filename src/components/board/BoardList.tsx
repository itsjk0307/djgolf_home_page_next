import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { formatDate, isNew, truncate } from "@/lib/utils";
import { FileText, Lock, Image } from "lucide-react";

interface BoardPost {
  id: number;
  subject: string;
  authorName: string;
  hit: number;
  isNotice: boolean;
  isLocked: boolean;
  createdAt: Date;
  files: { isImage: boolean }[];
  _count?: { replies: number };
}

interface BoardListProps {
  boardId: string;
  posts: BoardPost[];
  total: number;
  page: number;
  perPage?: number;
  basePath: string;
  showSearch?: boolean;
  searchWord?: string;
}

export async function BoardList({
  posts,
  total,
  page,
  perPage = 15,
  basePath,
  showSearch = true,
  searchWord = "",
}: BoardListProps) {
  const t = await getTranslations("Board");
  const totalPages = Math.ceil(total / perPage);

  return (
    <div>
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full board-table text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="w-16 text-center">{t("no")}</th>
              <th className="text-left">{t("title")}</th>
              <th className="w-24 text-center">{t("author")}</th>
              <th className="w-28 text-center">{t("date")}</th>
              <th className="w-16 text-center">{t("views")}</th>
            </tr>
          </thead>
          <tbody>
            {posts.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-12 text-gray-400">
                  {t("noData")}
                </td>
              </tr>
            )}
            {posts.map((post, idx) => (
              <tr key={post.id} className="hover:bg-gray-50 transition-colors">
                <td className="text-center text-gray-500">
                  {post.isNotice ? (
                    <span className="bg-golf-green text-white text-xs px-1.5 py-0.5 rounded">{t("notice")}</span>
                  ) : (
                    total - (page - 1) * perPage - idx
                  )}
                </td>
                <td>
                  <Link
                    href={`${basePath}/${post.id}`}
                    className="flex items-center gap-1.5 hover:text-golf-green font-medium text-gray-800"
                  >
                    {post.isLocked && <Lock className="w-3.5 h-3.5 text-gray-400" />}
                    {truncate(post.subject, 50)}
                    {isNew(post.createdAt) && (
                      <span className="bg-golf-green text-white text-[10px] px-1.5 py-0.5 rounded ml-1">
                        N
                      </span>
                    )}
                    {post.files.some((f) => !f.isImage) && (
                      <FileText className="w-3.5 h-3.5 text-gray-400 ml-1" />
                    )}
                    {post.files.some((f) => f.isImage) && (
                      <Image className="w-3.5 h-3.5 text-golf-green ml-1" />
                    )}
                    {(post._count?.replies ?? 0) > 0 && (
                      <span className="text-golf-green text-xs">
                        [{post._count!.replies}]
                      </span>
                    )}
                  </Link>
                </td>
                <td className="text-center text-gray-500">{post.authorName}</td>
                <td className="text-center text-gray-400">{formatDate(post.createdAt)}</td>
                <td className="text-center text-gray-400">{post.hit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-1 mt-8">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <Link
            key={p}
            href={`${basePath}?page=${p}${searchWord ? `&sw=${encodeURIComponent(searchWord)}` : ""}`}
            className={`w-9 h-9 flex items-center justify-center rounded text-sm transition-colors ${
              p === page
                ? "bg-golf-green text-white"
                : "bg-gray-100 text-gray-700 hover:bg-golf-green hover:text-white"
            }`}
          >
            {p}
          </Link>
        ))}
      </div>

      {/* Search */}
      {showSearch && (
        <form className="mt-6 flex justify-center gap-2">
          <select
            name="sk"
            defaultValue="subject"
            className="border rounded px-3 py-2 text-sm"
          >
            <option value="subject">{t("searchSubject")}</option>
            <option value="contents">{t("searchContents")}</option>
            <option value="name">{t("searchAuthor")}</option>
          </select>
          <input
            type="text"
            name="sw"
            defaultValue={searchWord}
            placeholder={t("searchPlaceholder")}
            className="border rounded px-3 py-2 text-sm w-64"
          />
          <button
            type="submit"
            className="bg-golf-green text-white px-5 py-2 rounded text-sm hover:bg-golf-green-light transition-colors"
          >
            {t("searchBtn")}
          </button>
        </form>
      )}
    </div>
  );
}
