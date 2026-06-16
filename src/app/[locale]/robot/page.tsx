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
      {/* Dark hero banner */}
      <div
        className="rounded-2xl p-10 mb-10 text-center overflow-hidden relative"
        style={{ background: "linear-gradient(135deg, #0f1624 0%, #1a2235 100%)" }}
      >
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: "radial-gradient(circle, #c9a84c 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />
        <div className="relative z-10">
          <p className="text-golf-gold text-xs font-bold uppercase tracking-widest mb-3">
            Autonomous AI Robot
          </p>
          <h2 className="text-2xl md:text-3xl font-black text-white mb-3">
            {t("heroTitle")}
          </h2>
          <p className="text-gray-400 text-base">{t("heroSubtitle")}</p>
        </div>
      </div>

      {/* Robot cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* F-1 */}
        <div
          className="group rounded-2xl overflow-hidden border border-white/10 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
          style={{ background: "linear-gradient(180deg, #0f1624, #1a2235)" }}
        >
          <div className="relative h-60 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f1624] to-transparent z-10" />
            <Image
              src="/images/robot/f-1.png"
              alt={t("f1.name")}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="p-6">
            <p className="text-golf-gold text-xs font-bold uppercase tracking-widest mb-1">
              {t("f1.type")}
            </p>
            <h3 className="text-xl font-black text-white mb-2">{t("f1.name")}</h3>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">{t("f1.short")}</p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/robot/f1"
                className="inline-flex items-center gap-2 bg-golf-green hover:bg-golf-green-light text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors"
              >
                {t("viewDetails")} <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="/brochures/dio-f1-brochure.pdf"
                download
                className="inline-flex items-center gap-2 border border-golf-gold text-golf-gold hover:bg-golf-gold hover:text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all"
              >
                <Download className="w-4 h-4" />
                {t("downloadBrochure")}
              </a>
            </div>
          </div>
        </div>

        {/* R-1 */}
        <div
          className="group rounded-2xl overflow-hidden border border-white/10 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
          style={{ background: "linear-gradient(180deg, #0f1624, #1a2235)" }}
        >
          <div className="relative h-60 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f1624] to-transparent z-10" />
            <Image
              src="/images/robot/r-1.png"
              alt={t("r1.name")}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="p-6">
            <p className="text-golf-gold text-xs font-bold uppercase tracking-widest mb-1">
              {t("r1.type")}
            </p>
            <h3 className="text-xl font-black text-white mb-2">{t("r1.name")}</h3>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">{t("r1.short")}</p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/robot/r1"
                className="inline-flex items-center gap-2 bg-golf-green hover:bg-golf-green-light text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors"
              >
                {t("viewDetails")} <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="/brochures/dio-r1-brochure.pdf"
                download
                className="inline-flex items-center gap-2 border border-golf-gold text-golf-gold hover:bg-golf-gold hover:text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all"
              >
                <Download className="w-4 h-4" />
                {t("downloadBrochure")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </SubPageLayout>
  );
}
