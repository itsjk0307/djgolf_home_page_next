import { SubPageLayout } from "@/components/layout/SubPageLayout";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "About.greeting" });
  return { title: t("title") };
}

export default async function GreetingPage() {
  const t = await getTranslations("About.greeting");

  return (
    <SubPageLayout
      title={t("title")}
      breadcrumbs={[{ label: t("breadcrumb") }, { label: t("title") }]}
    >
      <div className="flex flex-col md:flex-row gap-10">
        <div className="md:w-64 shrink-0">
          <div className="w-full aspect-[3/4] bg-gray-200 rounded-lg flex items-center justify-center text-gray-400">
            {t("ceoPhoto")}
          </div>
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-bold text-golf-green mb-4">{t("motto")}</h2>
          <div className="prose prose-gray max-w-none text-gray-700 space-y-4 leading-relaxed">
            <p>{t("p1")}</p>
            <p>{t("p2")}</p>
            <p>{t("p3")}</p>
            <p>{t("p4")}</p>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-golf-green font-bold border-b border-golf-green pb-2 mb-4">{t("careerTitle")}</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>{t("career1")}</li>
                <li>{t("career2")}</li>
                <li>{t("career3")}</li>
              </ul>
            </div>
            <div>
              <h3 className="text-golf-green font-bold border-b border-golf-green pb-2 mb-4">{t("educationTitle")}</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>{t("edu1")}</li>
                <li>{t("edu2")}</li>
                <li>{t("edu3")}</li>
                <li>{t("edu4")}</li>
                <li>{t("edu5")}</li>
                <li>{t("edu6")}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </SubPageLayout>
  );
}
