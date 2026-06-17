import { SubPageLayout } from "@/components/layout/SubPageLayout";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Privacy" });
  return { title: t("title") };
}

const SECTIONS = [
  "s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8",
] as const;

export default async function PrivacyPage() {
  const t = await getTranslations("Privacy");

  return (
    <SubPageLayout
      title={t("title")}
      breadcrumbs={[{ label: t("breadcrumb") }, { label: t("title") }]}
    >
      <div className="bg-golf-green/5 border border-golf-green/20 rounded-xl p-5 mb-8">
        <p className="text-gray-700 text-sm leading-relaxed">{t("companyInfo")}</p>
      </div>

      <div className="space-y-8">
        {SECTIONS.map((s) => (
          <section key={s}>
            <h2 className="text-base font-bold text-gray-900 mb-3 pb-2 border-b border-gray-200">
              {t(`${s}Title`)}
            </h2>
            <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
              {t(s)}
            </p>
          </section>
        ))}
      </div>

      <div className="mt-10 pt-6 border-t border-gray-200 text-xs text-gray-500">
        {t("effectiveDate")}
      </div>
    </SubPageLayout>
  );
}
