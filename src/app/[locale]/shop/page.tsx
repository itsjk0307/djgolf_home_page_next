import { SubPageLayout } from "@/components/layout/SubPageLayout";
import { getTranslations } from "next-intl/server";
import { ExternalLink } from "lucide-react";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Distribution.shop" });
  return { title: t("title") };
}

export default async function ShopPage() {
  const t = await getTranslations("Distribution.shop");

  const domestic = ["d1", "d2", "d3", "d4"] as const;
  const international = ["i1", "i2", "i3", "i4", "i5"] as const;

  return (
    <SubPageLayout
      title={t("title")}
      breadcrumbs={[{ label: t("breadcrumb") }, { label: t("title") }]}
    >
      {/* Partners section */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-golf-green border-b-2 border-golf-green pb-2 mb-4">
          {t("partnerTitle")}
        </h2>
        <p className="text-gray-600 mb-8">{t("partnerDesc")}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Domestic */}
          <div>
            <h3 className="font-bold text-gray-800 mb-4 text-base border-b pb-2">
              {t("domesticTitle")}
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {domestic.map((key) => (
                <div
                  key={key}
                  className="bg-gray-50 rounded-lg p-4 text-center text-sm font-medium text-gray-700 hover:bg-golf-green/10 transition-colors"
                >
                  {t(key)}
                </div>
              ))}
            </div>
          </div>

          {/* International */}
          <div>
            <h3 className="font-bold text-gray-800 mb-4 text-base border-b pb-2">
              {t("intlTitle")}
            </h3>
            <div className="grid grid-cols-1 gap-3">
              {international.map((key) => (
                <div
                  key={key}
                  className="bg-gray-50 rounded-lg p-4 text-sm font-medium text-gray-700 hover:bg-golf-green/10 transition-colors"
                >
                  {t(key)}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Online shop */}
      <section className="bg-golf-green/10 rounded-xl p-8 text-center">
        <h2 className="text-xl font-bold text-golf-green mb-3">{t("shopTitle")}</h2>
        <p className="text-gray-600 mb-6">{t("shopDesc")}</p>
        <a
          href="#"
          className="inline-flex items-center gap-2 bg-golf-green text-white px-8 py-3 rounded-full font-semibold hover:bg-golf-dark transition-colors"
        >
          {t("shopBtn")}
          <ExternalLink className="w-4 h-4" />
        </a>
      </section>
    </SubPageLayout>
  );
}
