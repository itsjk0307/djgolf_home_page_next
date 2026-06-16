import { SubPageLayout } from "@/components/layout/SubPageLayout";
import { getTranslations } from "next-intl/server";
import { ShieldCheck, CheckCircle } from "lucide-react";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Business.safety" });
  return { title: t("title") };
}

export default async function SafetyPage() {
  const t = await getTranslations("Business.safety");

  const systems = [
    { titleKey: "sys1Title", descKey: "sys1Desc" },
    { titleKey: "sys2Title", descKey: "sys2Desc" },
    { titleKey: "sys3Title", descKey: "sys3Desc" },
    { titleKey: "sys4Title", descKey: "sys4Desc" },
  ] as const;

  const certs = ["cert1", "cert2", "cert3"] as const;

  return (
    <SubPageLayout
      title={t("title")}
      breadcrumbs={[{ label: t("breadcrumb") }, { label: t("title") }]}
    >
      <div className="bg-golf-green text-white rounded-xl p-8 mb-10">
        <h2 className="text-xl font-bold mb-3">{t("bannerTitle")}</h2>
        <p className="text-green-200 leading-relaxed text-sm">{t("bannerDesc")}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        {systems.map(({ titleKey, descKey }) => (
          <div
            key={titleKey}
            className="flex items-start gap-4 bg-gray-50 rounded-xl p-5 hover:shadow-md transition-shadow"
          >
            <ShieldCheck className="w-6 h-6 text-golf-green shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-gray-900 mb-1">{t(titleKey)}</h4>
              <p className="text-gray-600 text-sm leading-relaxed">{t(descKey)}</p>
            </div>
          </div>
        ))}
      </div>

      <section>
        <h3 className="text-xl font-bold text-golf-green border-b-2 border-golf-green pb-2 mb-6">
          {t("certTitle")}
        </h3>
        <div className="space-y-3">
          {certs.map((key) => (
            <div key={key} className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-golf-green shrink-0 mt-0.5" />
              <p className="text-gray-700">{t(key)}</p>
            </div>
          ))}
        </div>
      </section>
    </SubPageLayout>
  );
}
