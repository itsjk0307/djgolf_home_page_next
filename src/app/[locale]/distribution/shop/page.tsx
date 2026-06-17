import { SubPageLayout } from "@/components/layout/SubPageLayout";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Clock, Phone, Mail } from "lucide-react";
import Image from "next/image";
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

const PARTNER_CATEGORIES = [
  {
    titleKey: "cat1Title" as const,
    images: [1, 2, 3, 4, 5, 6],
  },
  {
    titleKey: "cat2Title" as const,
    images: [7, 8, 9, 10, 11, 12, 13],
  },
  {
    titleKey: "cat3Title" as const,
    images: [14],
  },
  {
    titleKey: "cat4Title" as const,
    images: [15],
  },
] as const;

export default async function ShopPage() {
  const t = await getTranslations("Distribution.shop");

  return (
    <SubPageLayout
      title={t("title")}
      breadcrumbs={[{ label: t("breadcrumb") }, { label: t("title") }]}
    >
      {/* Partners section */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-golf-green border-b-2 border-golf-green pb-2 mb-3">
          {t("partnerTitle")}
        </h2>
        <p className="text-gray-600 mb-8 text-sm">{t("partnerDesc")}</p>

        <div className="space-y-8">
          {PARTNER_CATEGORIES.map((cat) => (
            <div key={cat.titleKey}>
              <h3 className="font-semibold text-gray-800 mb-4 pb-1 border-b border-gray-200">
                {t(cat.titleKey)}
              </h3>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                {cat.images.map((n) => (
                  <div
                    key={n}
                    className="bg-white border rounded-lg p-3 flex items-center justify-center aspect-[4/3] hover:shadow-md transition-shadow"
                  >
                    <Image
                      src={`/images/legacy/partner_${n}.jpg`}
                      alt={`Partner ${n}`}
                      width={120}
                      height={80}
                      className="object-contain w-full h-auto max-h-16"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Coming soon — online shop */}
      <section className="bg-gray-50 rounded-2xl p-8 text-center">
        <div className="inline-flex items-center gap-2 bg-golf-gold/10 text-golf-gold border border-golf-gold/30 rounded-full px-4 py-1.5 text-sm font-semibold mb-4">
          <Clock className="w-4 h-4" />
          {t("comingSoonBadge")}
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-3">{t("comingSoonTitle")}</h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">{t("comingSoonDesc")}</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-golf-green shrink-0" />
            <span>031-373-8914</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-golf-green shrink-0" />
            <span>info@dj-golf.co.kr</span>
          </div>
        </div>
        <Link
          href="/inquiry"
          className="inline-block mt-6 bg-golf-green text-white px-7 py-3 rounded-full font-semibold hover:bg-golf-dark transition-colors text-sm"
        >
          {t("contactBtn")}
        </Link>
      </section>
    </SubPageLayout>
  );
}
