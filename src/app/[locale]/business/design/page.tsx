import { SubPageLayout } from "@/components/layout/SubPageLayout";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Business.design" });
  return { title: t("title") };
}

export default async function DesignPage() {
  const t = await getTranslations("Business.design");

  const intro = [
    { titleKey: "i1Title", descKey: "i1Desc" },
    { titleKey: "i2Title", descKey: "i2Desc" },
    { titleKey: "i3Title", descKey: "i3Desc" },
  ] as const;

  const steps = ["step1", "step2", "step3", "step4", "step5"] as const;

  const stats = [
    { numKey: "stat1Num", labelKey: "stat1Label" },
    { numKey: "stat2Num", labelKey: "stat2Label" },
    { numKey: "stat3Num", labelKey: "stat3Label" },
  ] as const;

  return (
    <SubPageLayout
      title={t("title")}
      breadcrumbs={[{ label: t("breadcrumb") }, { label: t("title") }]}
    >
      <div className="bg-golf-green text-white rounded-xl p-8 mb-10">
        <h2 className="text-xl font-bold mb-3">{t("bannerTitle")}</h2>
        <p className="text-green-200 leading-relaxed text-sm">{t("bannerDesc")}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-10">
        {stats.map(({ numKey, labelKey }) => (
          <div key={numKey} className="text-center bg-golf-green/10 rounded-xl p-6">
            <p className="text-3xl font-bold text-golf-green mb-1">{t(numKey)}</p>
            <p className="text-gray-600 text-sm">{t(labelKey)}</p>
          </div>
        ))}
      </div>

      {/* Fields */}
      <section className="mb-10">
        <h3 className="text-xl font-bold text-golf-green border-b-2 border-golf-green pb-2 mb-6">
          {t("introTitle")}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {intro.map(({ titleKey, descKey }) => (
            <div key={titleKey} className="bg-gray-50 rounded-xl p-6 text-center">
              <h4 className="font-bold text-gray-900 mb-3">{t(titleKey)}</h4>
              <p className="text-gray-600 text-sm leading-relaxed">{t(descKey)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section>
        <h3 className="text-xl font-bold text-golf-green border-b-2 border-golf-green pb-2 mb-6">
          {t("processTitle")}
        </h3>
        <div className="flex flex-col md:flex-row gap-0">
          {steps.map((key, i) => (
            <div key={key} className="flex md:flex-col items-center gap-3 flex-1">
              <div className="flex items-center gap-2 md:flex-col md:items-center">
                <div className="w-10 h-10 rounded-full bg-golf-green text-white flex items-center justify-center font-bold shrink-0">
                  {i + 1}
                </div>
                {i < steps.length - 1 && (
                  <div className="w-8 h-0.5 bg-golf-green md:hidden" />
                )}
              </div>
              <p className="text-sm text-gray-700 text-center leading-snug">{t(key)}</p>
              {i < steps.length - 1 && (
                <div className="hidden md:block h-0.5 w-full bg-golf-green/30 mt-5" />
              )}
            </div>
          ))}
        </div>
      </section>
    </SubPageLayout>
  );
}
