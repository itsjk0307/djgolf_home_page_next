import { SubPageLayout } from "@/components/layout/SubPageLayout";
import { getTranslations } from "next-intl/server";
import { CheckCircle } from "lucide-react";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "About.certifications" });
  return { title: t("title") };
}

export default async function CertificationsPage() {
  const t = await getTranslations("About.certifications");

  const certKeys = [
    "cert1", "cert2", "cert3", "cert4", "cert5",
    "cert6", "cert7", "cert8", "cert9", "cert10",
  ] as const;

  return (
    <SubPageLayout
      title={t("title")}
      breadcrumbs={[{ label: t("breadcrumb") }, { label: t("title") }]}
    >
      <p className="text-gray-600 leading-relaxed mb-10">{t("intro")}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {certKeys.map((key, i) => (
          <div
            key={key}
            className="flex items-start gap-4 bg-gray-50 rounded-xl p-5 hover:shadow-md transition-shadow"
          >
            <CheckCircle className="w-6 h-6 text-golf-green shrink-0 mt-0.5" />
            <div>
              <span className="text-xs font-bold text-golf-green uppercase tracking-wide block mb-1">
                #{String(i + 1).padStart(2, "0")}
              </span>
              <p className="text-gray-800 font-medium text-sm leading-relaxed">{t(key)}</p>
            </div>
          </div>
        ))}
      </div>
    </SubPageLayout>
  );
}
