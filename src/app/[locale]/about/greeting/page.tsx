import Image from "next/image";
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
      {/* CEO Photo + Motto */}
      <div className="flex flex-col md:flex-row gap-10 mb-12">
        <div className="md:w-64 shrink-0">
          <div className="w-full aspect-[3/4] relative rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="/images/about/ceo.jpg"
              alt={t("ceoPhoto")}
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div className="flex-1">
          <div className="relative mb-8">
            <div
              className="absolute -left-4 top-0 bottom-0 w-1 rounded-full"
              style={{ background: "linear-gradient(180deg, #c9a84c, #2d5a27)" }}
            />
            <blockquote className="pl-6">
              <p className="text-2xl md:text-3xl font-black text-golf-green-dark leading-snug">
                {t("motto")}
              </p>
            </blockquote>
          </div>

          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>{t("p1")}</p>
            <p>{t("p2")}</p>
            <p>{t("p3")}</p>
            <p>{t("p4")}</p>
          </div>
        </div>
      </div>

      {/* Career & Education */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 rounded-2xl p-6">
          <h3 className="font-bold text-gray-900 border-b-2 border-golf-green pb-3 mb-5 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-golf-green inline-block" />
            {t("careerTitle")}
          </h3>
          <ul className="space-y-3 text-sm text-gray-600">
            {(["career1", "career2", "career3"] as const).map((key) => (
              <li key={key} className="flex items-start gap-2">
                <span className="text-golf-green mt-1 shrink-0">›</span>
                {t(key)}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-gray-50 rounded-2xl p-6">
          <h3 className="font-bold text-gray-900 border-b-2 border-golf-green pb-3 mb-5 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-golf-green inline-block" />
            {t("educationTitle")}
          </h3>
          <ul className="space-y-3 text-sm text-gray-600">
            {(["edu1", "edu2", "edu3", "edu4", "edu5", "edu6"] as const).map((key) => (
              <li key={key} className="flex items-start gap-2">
                <span className="text-golf-green mt-1 shrink-0">›</span>
                {t(key)}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </SubPageLayout>
  );
}
