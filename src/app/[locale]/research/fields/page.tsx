import { SubPageLayout } from "@/components/layout/SubPageLayout";
import { getTranslations } from "next-intl/server";
import { FlaskConical, BookOpen } from "lucide-react";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Research.fields" });
  return { title: t("title") };
}

export default async function ResearchFieldsPage() {
  const t = await getTranslations("Research.fields");

  const analysisKeys = ["a1", "a2", "a3", "a4", "a5", "a6", "a7"] as const;
  const taskKeys = ["t1", "t2", "t3", "t4", "t5", "t6", "t7", "t8"] as const;

  return (
    <SubPageLayout
      title={t("title")}
      breadcrumbs={[{ label: t("breadcrumb") }, { label: t("breadcrumb2") }]}
    >
      <div className="bg-golf-green text-white rounded-xl p-8 mb-10">
        <h2 className="text-xl font-bold mb-3">{t("bannerTitle")}</h2>
        <p className="text-green-200 leading-relaxed">{t("bannerDesc")}</p>
      </div>

      {/* Analysis categories */}
      <section className="mb-10">
        <h3 className="text-xl font-bold text-golf-green border-b-2 border-golf-green pb-2 mb-6 flex items-center gap-2">
          <FlaskConical className="w-5 h-5" />
          {t("analysisTitle")}
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {analysisKeys.map((key, i) => (
            <div
              key={key}
              className="bg-golf-green/10 rounded-xl p-4 text-center"
            >
              <span className="block text-2xl font-bold text-golf-green mb-1">{i + 1}</span>
              <span className="text-sm text-gray-700 font-medium">{t(key)}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Research tasks */}
      <section>
        <h3 className="text-xl font-bold text-golf-green border-b-2 border-golf-green pb-2 mb-6 flex items-center gap-2">
          <BookOpen className="w-5 h-5" />
          {t("tasksTitle")}
        </h3>
        <div className="space-y-3">
          {taskKeys.map((key, i) => (
            <div key={key} className="flex items-start gap-4 bg-gray-50 rounded-xl p-4">
              <span className="w-7 h-7 rounded-full bg-golf-green text-white text-xs font-bold flex items-center justify-center shrink-0">
                {i + 1}
              </span>
              <p className="text-gray-700 text-sm leading-relaxed pt-0.5">{t(key)}</p>
            </div>
          ))}
        </div>
      </section>
    </SubPageLayout>
  );
}
