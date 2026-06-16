import { SubPageLayout } from "@/components/layout/SubPageLayout";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "About.affiliates" });
  return { title: t("title") };
}

const AFFILIATE_COLORS = [
  "#13a89e",
  "#25aae1",
  "#0e76bc",
  "#283891",
  "#056839",
  "#39b54a",
  "#8dc63f",
];

export default async function AffiliatesPage() {
  const t = await getTranslations("About.affiliates");

  const affiliates = [
    { nameKey: "a1Name", descKey: "a1Desc", fieldKey: "a1Field" },
    { nameKey: "a2Name", descKey: "a2Desc", fieldKey: "a2Field" },
    { nameKey: "a3Name", descKey: "a3Desc", fieldKey: "a3Field" },
    { nameKey: "a4Name", descKey: "a4Desc", fieldKey: "a4Field" },
    { nameKey: "a5Name", descKey: "a5Desc", fieldKey: "a5Field" },
    { nameKey: "a6Name", descKey: "a6Desc", fieldKey: "a6Field" },
    { nameKey: "a7Name", descKey: "a7Desc", fieldKey: "a7Field" },
  ] as const;

  return (
    <SubPageLayout
      title={t("title")}
      breadcrumbs={[{ label: t("breadcrumb") }, { label: t("title") }]}
    >
      <p className="text-gray-600 leading-relaxed mb-10 text-base">{t("intro")}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {affiliates.map(({ nameKey, descKey, fieldKey }, i) => (
          <div
            key={nameKey}
            className="border rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div
              className="h-2"
              style={{ backgroundColor: AFFILIATE_COLORS[i] }}
            />
            <div className="p-6">
              <div className="flex items-start justify-between gap-3 mb-3">
                <h3 className="font-bold text-gray-900 text-lg">{t(nameKey)}</h3>
                <span
                  className="text-xs font-medium px-2 py-1 rounded-full text-white shrink-0"
                  style={{ backgroundColor: AFFILIATE_COLORS[i] }}
                >
                  {t(fieldKey)}
                </span>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">{t(descKey)}</p>
            </div>
          </div>
        ))}
      </div>
    </SubPageLayout>
  );
}
