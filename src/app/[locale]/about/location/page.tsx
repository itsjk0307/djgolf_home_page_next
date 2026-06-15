import { SubPageLayout } from "@/components/layout/SubPageLayout";
import { MapPin, Phone, Clock } from "lucide-react";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "About.location" });
  return { title: t("title") };
}

export default async function LocationPage() {
  const t = await getTranslations("About.location");

  return (
    <SubPageLayout
      title={t("title")}
      breadcrumbs={[{ label: t("breadcrumb") }, { label: t("title") }]}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="w-full h-96 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400">
            <div className="text-center">
              <MapPin className="w-12 h-12 mx-auto mb-2" />
              <p>{t("mapPlaceholder")}</p>
              <p className="text-sm mt-1">{t("mapHint")}</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="font-bold text-gray-900 text-lg mb-4 pb-2 border-b-2 border-golf-green">
              {t("hqTitle")}
            </h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex gap-3">
                <MapPin className="w-4 h-4 text-golf-green shrink-0 mt-0.5" />
                <span>{t("address")}</span>
              </li>
              <li className="flex gap-3">
                <Phone className="w-4 h-4 text-golf-green shrink-0 mt-0.5" />
                <div>
                  <p>{t("tel")}</p>
                  <p>{t("fax")}</p>
                </div>
              </li>
              <li className="flex gap-3">
                <Clock className="w-4 h-4 text-golf-green shrink-0 mt-0.5" />
                <div>
                  <p>{t("hours")}</p>
                  <p className="text-gray-400">{t("holidays")}</p>
                </div>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-3">{t("trafficTitle")}</h3>
            <div className="space-y-3 text-sm text-gray-600">
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="font-medium text-gray-800 mb-1">{t("byCar")}</p>
                <p>{t("byCarDesc")}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="font-medium text-gray-800 mb-1">{t("byTransit")}</p>
                <p>{t("byTransitDesc")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SubPageLayout>
  );
}
