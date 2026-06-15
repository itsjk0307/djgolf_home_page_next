import { SubPageLayout } from "@/components/layout/SubPageLayout";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "About.organization" });
  return { title: t("title") };
}

export default async function OrganizationPage() {
  const t = await getTranslations("About.organization");

  return (
    <SubPageLayout
      title={t("title")}
      breadcrumbs={[{ label: t("breadcrumb") }, { label: t("title") }]}
    >
      <div className="text-center">
        <div className="bg-gray-100 rounded-xl p-16 text-gray-400">
          <p className="text-lg">{t("placeholder")}</p>
          <p className="text-sm mt-2">{t("placeholderHint")}</p>
        </div>
      </div>
    </SubPageLayout>
  );
}
