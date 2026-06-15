import { SubPageLayout } from "@/components/layout/SubPageLayout";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Research.intro" });
  return { title: t("title") };
}

export default async function ResearchIntroPage() {
  const t = await getTranslations("Research.intro");

  const equipKeys = [
    ["equip1Name", "equip1Desc"],
    ["equip2Name", "equip2Desc"],
    ["equip3Name", "equip3Desc"],
    ["equip4Name", "equip4Desc"],
    ["equip5Name", "equip5Desc"],
    ["equip6Name", "equip6Desc"],
    ["equip7Name", "equip7Desc"],
    ["equip8Name", "equip8Desc"],
  ] as const;

  const solutionKeys = ["solution1", "solution2", "solution3", "solution4"] as const;

  return (
    <SubPageLayout
      title={t("title")}
      breadcrumbs={[{ label: t("breadcrumb") }, { label: t("breadcrumb2") }]}
    >
      <div className="bg-golf-green text-white rounded-xl p-8 mb-10">
        <h2 className="text-xl font-bold mb-3">{t("bannerTitle")}</h2>
        <p className="text-green-200 leading-relaxed">{t("bannerDesc")}</p>
      </div>

      <div className="bg-gray-50 rounded-xl p-8 mb-10">
        <h3 className="text-lg font-bold text-gray-900 mb-4">{t("solutionTitle")}</h3>
        <ol className="space-y-2 text-gray-700">
          {solutionKeys.map((key, i) => (
            <li key={key} className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-golf-green text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                {i + 1}
              </span>
              {t(key)}
            </li>
          ))}
        </ol>
      </div>

      <h3 className="text-xl font-bold text-golf-green border-b-2 border-golf-green pb-2 mb-6">
        {t("equipTitle")}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {equipKeys.map(([nameKey, descKey]) => (
          <div key={nameKey} className="border rounded-lg p-5 hover:shadow-md transition-shadow">
            <h4 className="font-semibold text-gray-900 mb-2">{t(nameKey)}</h4>
            <p className="text-sm text-gray-600">{t(descKey)}</p>
          </div>
        ))}
      </div>
    </SubPageLayout>
  );
}
