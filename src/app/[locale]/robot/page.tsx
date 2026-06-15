import Image from "next/image";
import { SubPageLayout } from "@/components/layout/SubPageLayout";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ArrowRight, Download } from "lucide-react";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Robot" });
  return { title: t("heroTitle") };
}

export default async function RobotPage() {
  const t = await getTranslations("Robot");

  return (
    <SubPageLayout
      title={t("heroTitle")}
      breadcrumbs={[{ label: t("breadcrumb") }]}
    >
      <div className="bg-golf-dark text-white rounded-xl p-10 mb-10 text-center">
        <h2 className="text-2xl font-bold mb-3">{t("heroTitle")}</h2>
        <p className="text-gray-300 text-lg">{t("heroSubtitle")}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
          <div className="relative h-56 bg-gray-100">
            <Image
              src="/images/robot-f1.jpg"
              alt={t("f1.name")}
              fill
              className="object-cover"
            />
          </div>
          <div className="p-6">
            <p className="text-golf-green text-xs font-semibold uppercase tracking-wide mb-1">
              {t("f1.type")}
            </p>
            <h3 className="text-xl font-bold text-gray-900 mb-1">{t("f1.name")}</h3>
            <p className="text-gray-500 text-sm mb-5">{t("f1.short")}</p>
            <div className="flex flex-wrap gap-2">
              <Link
                href="/robot/f1"
                className="inline-flex items-center gap-2 bg-golf-green text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-golf-green-light transition-colors"
              >
                {t("viewDetails")} <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="/brochures/dio-f1-brochure.pdf"
                download
                className="inline-flex items-center gap-2 border border-golf-gold text-golf-gold px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-golf-gold hover:text-white transition-colors"
              >
                <Download className="w-4 h-4" />
                브로슈어 다운로드
              </a>
            </div>
          </div>
        </div>

        <div className="bg-white border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
          <div className="relative h-56 bg-gray-100">
            <Image
              src="/images/robot-r1.jpg"
              alt={t("r1.name")}
              fill
              className="object-cover"
            />
          </div>
          <div className="p-6">
            <p className="text-golf-green text-xs font-semibold uppercase tracking-wide mb-1">
              {t("r1.type")}
            </p>
            <h3 className="text-xl font-bold text-gray-900 mb-1">{t("r1.name")}</h3>
            <p className="text-gray-500 text-sm mb-5">{t("r1.short")}</p>
            <div className="flex flex-wrap gap-2">
              <Link
                href="/robot/r1"
                className="inline-flex items-center gap-2 bg-golf-green text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-golf-green-light transition-colors"
              >
                {t("viewDetails")} <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="/brochures/dio-r1-brochure.pdf"
                download
                className="inline-flex items-center gap-2 border border-golf-gold text-golf-gold px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-golf-gold hover:text-white transition-colors"
              >
                <Download className="w-4 h-4" />
                브로슈어 다운로드
              </a>
            </div>
          </div>
        </div>
      </div>
    </SubPageLayout>
  );
}
