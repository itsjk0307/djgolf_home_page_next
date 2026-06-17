import { SubPageLayout } from "@/components/layout/SubPageLayout";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
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

const CERT_IMAGES = [
  "cert1.jpg", "cert2.jpg", "cert3.jpg", "cert4.jpg", "cert5.jpg",
  "cert6.jpg", "cert7.jpg", "cert8.jpg", "cert9.jpg", "cert10.jpg",
] as const;

const CERT_KEYS = [
  "cert1", "cert2", "cert3", "cert4", "cert5",
  "cert6", "cert7", "cert8", "cert9", "cert10",
] as const;

export default async function CertificationsPage() {
  const t = await getTranslations("About.certifications");

  return (
    <SubPageLayout
      title={t("title")}
      breadcrumbs={[{ label: t("breadcrumb") }, { label: t("title") }]}
    >
      <p className="text-gray-600 leading-relaxed mb-10">{t("intro")}</p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {CERT_IMAGES.map((img, i) => (
          <div
            key={img}
            className="flex flex-col items-center gap-3 bg-gray-50 rounded-xl p-4 hover:shadow-md transition-shadow"
          >
            <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden bg-white shadow-sm">
              <Image
                src={`/images/legacy/${img}`}
                alt={t(CERT_KEYS[i])}
                fill
                className="object-contain p-1"
              />
            </div>
            <p className="text-xs text-gray-700 text-center leading-snug font-medium">
              {t(CERT_KEYS[i])}
            </p>
          </div>
        ))}
      </div>
    </SubPageLayout>
  );
}
