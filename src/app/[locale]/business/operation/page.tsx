import { SubPageLayout } from "@/components/layout/SubPageLayout";
import { getTranslations } from "next-intl/server";
import { MapPin } from "lucide-react";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Business.operation" });
  return { title: t("title") };
}

export default async function OperationPage() {
  const t = await getTranslations("Business.operation");

  const feats = [
    { titleKey: "feat1Title", descKey: "feat1Desc" },
    { titleKey: "feat2Title", descKey: "feat2Desc" },
    { titleKey: "feat3Title", descKey: "feat3Desc" },
    { titleKey: "feat4Title", descKey: "feat4Desc" },
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

      {/* Current operations */}
      <section className="mb-10">
        <h3 className="text-xl font-bold text-golf-green border-b-2 border-golf-green pb-2 mb-6">
          {t("currentTitle")}
        </h3>
        <div className="bg-gray-50 rounded-xl p-6 flex items-start gap-4">
          <MapPin className="w-6 h-6 text-golf-green shrink-0 mt-1" />
          <div>
            <p className="font-bold text-gray-900 text-lg mb-1">{t("current1")}</p>
            <p className="text-gray-600 text-sm">{t("current1Desc")}</p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {feats.map(({ titleKey, descKey }) => (
            <div
              key={titleKey}
              className="border-l-4 border-golf-green bg-gray-50 rounded-r-xl p-5"
            >
              <h4 className="font-bold text-gray-900 mb-2">{t(titleKey)}</h4>
              <p className="text-gray-600 text-sm leading-relaxed">{t(descKey)}</p>
            </div>
          ))}
        </div>
      </section>
    </SubPageLayout>
  );
}
