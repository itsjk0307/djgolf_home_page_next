import { SubPageLayout } from "@/components/layout/SubPageLayout";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ArrowLeft, Download } from "lucide-react";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Robot" });
  return { title: `${t("r1.name")} 제품소개서` };
}

export default async function R1BrochurePage() {
  const t = await getTranslations("Robot");

  return (
    <SubPageLayout
      title="디오 R-1 제품소개서"
      breadcrumbs={[
        { label: t("breadcrumb"), href: "/robot" },
        { label: t("r1.breadcrumb"), href: "/robot/r1" },
        { label: "제품소개서" },
      ]}
    >
      <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <Link
          href="/robot/r1"
          className="inline-flex items-center gap-2 text-golf-green hover:text-golf-green-light font-medium text-sm transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          디오 R-1 제품 정보로 돌아가기
        </Link>
        <a
          href="/brochures/dio-r1-brochure.pdf"
          download
          className="inline-flex items-center gap-2 bg-golf-gold text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
        >
          <Download className="w-4 h-4" />
          PDF 다운로드
        </a>
      </div>

      <div className="block sm:hidden mb-6 bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm text-amber-800">
        모바일에서는 다운로드 버튼을 이용해 주세요.
      </div>

      <div className="hidden sm:block w-full rounded-xl overflow-hidden border border-gray-200 shadow-sm mb-6">
        <iframe
          src="/brochures/dio-r1-brochure.pdf"
          width="100%"
          height="800px"
          title="디오 R-1 제품소개서"
        >
          <div className="flex flex-col items-center justify-center h-48 gap-4 text-gray-500">
            <p>이 브라우저에서는 PDF를 표시할 수 없습니다.</p>
            <a
              href="/brochures/dio-r1-brochure.pdf"
              download
              className="inline-flex items-center gap-2 bg-golf-gold text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              <Download className="w-4 h-4" />
              PDF 다운로드
            </a>
          </div>
        </iframe>
      </div>

      <div className="sm:hidden text-center">
        <a
          href="/brochures/dio-r1-brochure.pdf"
          download
          className="inline-flex items-center gap-2 bg-golf-gold text-white px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
        >
          <Download className="w-5 h-5" />
          제품소개서 다운로드 (PDF)
        </a>
      </div>
    </SubPageLayout>
  );
}
