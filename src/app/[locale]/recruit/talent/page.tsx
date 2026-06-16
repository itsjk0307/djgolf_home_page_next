import { SubPageLayout } from "@/components/layout/SubPageLayout";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Download, Mail, Phone } from "lucide-react";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Recruit.talent" });
  return { title: t("title") };
}

export default async function TalentPage() {
  const t = await getTranslations("Recruit.talent");

  const talents = [
    { titleKey: "t1Title", descKey: "t1Desc", icon: "🎯" },
    { titleKey: "t2Title", descKey: "t2Desc", icon: "🚀" },
    { titleKey: "t3Title", descKey: "t3Desc", icon: "💎" },
    { titleKey: "t4Title", descKey: "t4Desc", icon: "🤝" },
  ] as const;

  const steps = ["applyStep1", "applyStep2", "applyStep3", "applyStep4"] as const;

  return (
    <SubPageLayout
      title={t("title")}
      breadcrumbs={[{ label: t("breadcrumb") }, { label: t("title") }]}
    >
      {/* Talent values */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-golf-green border-b-2 border-golf-green pb-2 mb-4">
          {t("introTitle")}
        </h2>
        <p className="text-gray-600 mb-8">{t("introDesc")}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {talents.map(({ titleKey, descKey, icon }) => (
            <div
              key={titleKey}
              className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow"
            >
              <div className="text-3xl mb-3">{icon}</div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">{t(titleKey)}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{t(descKey)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How to apply */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-golf-green border-b-2 border-golf-green pb-2 mb-6">
          {t("applyTitle")}
        </h2>
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          {steps.map((key, i) => (
            <div key={key} className="flex items-center gap-3 flex-1">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-golf-green text-white font-bold flex items-center justify-center shrink-0">
                  {i + 1}
                </div>
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute" />
                )}
              </div>
              <p className="text-sm text-gray-700">{t(key)}</p>
            </div>
          ))}
        </div>

        <div className="bg-golf-green/10 rounded-xl p-6 space-y-4">
          <a
            href="/brochures/application-form.pdf"
            download
            className="flex items-center gap-3 text-golf-green font-semibold hover:underline"
          >
            <Download className="w-5 h-5" />
            {t("downloadForm")}
          </a>
          <div className="flex items-center gap-3 text-gray-700">
            <Mail className="w-5 h-5 text-golf-green shrink-0" />
            <span>{t("applyEmail")}</span>
          </div>
          <div className="flex items-center gap-3 text-gray-700">
            <Phone className="w-5 h-5 text-golf-green shrink-0" />
            <span>{t("applyFax")}</span>
          </div>
        </div>
      </section>

      <div className="text-center">
        <Link
          href="/recruit/jobs"
          className="inline-block bg-golf-green text-white px-8 py-3 rounded-full font-semibold hover:bg-golf-dark transition-colors"
        >
          {t("viewJobs")}
        </Link>
      </div>
    </SubPageLayout>
  );
}
