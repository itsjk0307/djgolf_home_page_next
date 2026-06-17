import { SubPageLayout } from "@/components/layout/SubPageLayout";
import { getTranslations } from "next-intl/server";
import { Leaf } from "lucide-react";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Business.landscape" });
  return { title: t("title") };
}

export default async function LandscapePage() {
  const t = await getTranslations("Business.landscape");

  const turfTypes = ["turfType1", "turfType2", "turfType3"] as const;
  const pineTypes = ["pineType1", "pineType2", "pineType3"] as const;
  const services = ["svc1", "svc2", "svc3", "svc4"] as const;

  return (
    <SubPageLayout
      title={t("title")}
      breadcrumbs={[{ label: t("breadcrumb") }, { label: t("title") }]}
    >
      <div className="bg-golf-green text-white rounded-xl p-8 mb-10">
        <h2 className="text-xl font-bold mb-3">{t("bannerTitle")}</h2>
        <p className="text-green-200 leading-relaxed text-sm">{t("bannerDesc")}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {/* Turf farm */}
        <div className="bg-gray-50 rounded-xl p-6">
          <h3 className="text-lg font-bold text-golf-green mb-3">{t("turfTitle")}</h3>
          <p className="text-gray-600 text-sm mb-4">{t("turfDesc")}</p>
          <div className="flex gap-4 mb-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-golf-green">{t("turfSize")}</p>
              <p className="text-xs text-gray-500">{t("turfLoc")}</p>
            </div>
          </div>
          <h4 className="font-semibold text-gray-800 mb-2 text-sm">{t("varietiesTitle")}</h4>
          <ul className="space-y-1">
            {turfTypes.map((key) => (
              <li key={key} className="flex items-center gap-2 text-sm text-gray-600">
                <Leaf className="w-3.5 h-3.5 text-golf-green shrink-0" />
                {t(key)}
              </li>
            ))}
          </ul>
        </div>

        {/* Pine farm */}
        <div className="bg-gray-50 rounded-xl p-6">
          <h3 className="text-lg font-bold text-golf-green mb-3">{t("pineTitle")}</h3>
          <p className="text-gray-600 text-sm mb-4">{t("pineDesc")}</p>
          <h4 className="font-semibold text-gray-800 mb-2 text-sm">{t("varietiesTitle")}</h4>
          <ul className="space-y-1">
            {pineTypes.map((key) => (
              <li key={key} className="flex items-center gap-2 text-sm text-gray-600">
                <Leaf className="w-3.5 h-3.5 text-golf-green shrink-0" />
                {t(key)}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Services */}
      <section>
        <h3 className="text-xl font-bold text-golf-green border-b-2 border-golf-green pb-2 mb-6">
          {t("serviceTitle")}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {services.map((key, i) => (
            <div
              key={key}
              className="flex items-start gap-3 bg-gray-50 rounded-xl p-4"
            >
              <span className="w-7 h-7 rounded-full bg-golf-green text-white text-xs font-bold flex items-center justify-center shrink-0">
                {i + 1}
              </span>
              <p className="text-gray-700 text-sm pt-0.5">{t(key)}</p>
            </div>
          ))}
        </div>
      </section>
    </SubPageLayout>
  );
}
