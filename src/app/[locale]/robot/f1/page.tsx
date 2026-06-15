import { SubPageLayout } from "@/components/layout/SubPageLayout";
import { getTranslations } from "next-intl/server";
import { Bot, Zap, Eye, Smartphone, Download, Phone } from "lucide-react";
import ImageCarousel from "@/components/ImageCarousel";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Robot" });
  return { title: t("f1.name") };
}

export default async function F1Page() {
  const t = await getTranslations("Robot");

  type RobotKey = Parameters<typeof t>[0];

  const features = [
    { icon: Bot, titleKey: "f1.feature1Title" as RobotKey, descKey: "f1.feature1Desc" as RobotKey },
    { icon: Zap, titleKey: "f1.feature2Title" as RobotKey, descKey: "f1.feature2Desc" as RobotKey },
    { icon: Eye, titleKey: "f1.feature3Title" as RobotKey, descKey: "f1.feature3Desc" as RobotKey },
    { icon: Smartphone, titleKey: "f1.feature4Title" as RobotKey, descKey: "f1.feature4Desc" as RobotKey },
  ];

  const benefits: RobotKey[] = ["f1.benefit1", "f1.benefit2", "f1.benefit3"];

  const steps = [
    { num: 1, titleKey: "f1.step1Title" as RobotKey, descKey: "f1.step1Desc" as RobotKey },
    { num: 2, titleKey: "f1.step2Title" as RobotKey, descKey: "f1.step2Desc" as RobotKey },
    { num: 3, titleKey: "f1.step3Title" as RobotKey, descKey: "f1.step3Desc" as RobotKey },
    { num: 4, titleKey: "f1.step4Title" as RobotKey, descKey: "f1.step4Desc" as RobotKey },
  ];

  const specs: [RobotKey, RobotKey][] = [
    ["f1.spec1Name", "f1.spec1Value"],
    ["f1.spec2Name", "f1.spec2Value"],
    ["f1.spec3Name", "f1.spec3Value"],
    ["f1.spec4Name", "f1.spec4Value"],
    ["f1.spec5Name", "f1.spec5Value"],
    ["f1.spec6Name", "f1.spec6Value"],
    ["f1.spec7Name", "f1.spec7Value"],
  ];

  return (
    <SubPageLayout
      title={t("f1.name")}
      breadcrumbs={[
        { label: t("breadcrumb"), href: "/robot" },
        { label: t("f1.breadcrumb") },
      ]}
    >
      <div className="flex flex-col md:flex-row gap-8 items-center mb-12">
        <div className="w-full md:w-2/5">
          <ImageCarousel
            images={[
              { src: "/images/robot/f-1.png", alt: "디오 F-1 정면" },
              { src: "/images/robot/f-1.1.png", alt: "디오 F-1 측면" },
              { src: "/images/robot/f-1.2.png", alt: "디오 F-1 운행" },
            ]}
            autoPlayInterval={3000}
          />
        </div>
        <div className="w-full md:w-3/5">
          <p className="text-sm font-semibold text-golf-green uppercase tracking-widest mb-2">
            {t("f1.type")}
          </p>
          <h2 className="text-4xl font-bold text-golf-dark mb-3">{t("f1.name")}</h2>
          <p className="text-lg font-semibold text-golf-green mb-3">{t("f1.tagline")}</p>
          <p className="text-gray-500">{t("f1.short")}</p>
        </div>
      </div>

      <div className="mb-12">
        <h3 className="text-xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-golf-green">
          {t("featuresSectionTitle")}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {features.map(({ icon: Icon, titleKey, descKey }) => (
            <div key={titleKey} className="bg-gray-50 rounded-lg p-5 border">
              <Icon className="w-8 h-8 text-golf-green mb-3" />
              <h4 className="font-semibold text-gray-900 mb-2">{t(titleKey)}</h4>
              <p className="text-sm text-gray-600">{t(descKey)}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-12">
        <h3 className="text-xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-golf-green">
          {t("benefitsSectionTitle")}
        </h3>
        <div className="bg-golf-green/5 border border-golf-green/20 rounded-xl p-6">
          <ul className="space-y-3">
            {benefits.map((key) => (
              <li key={key} className="flex items-start gap-3 text-gray-700">
                <span className="w-2 h-2 rounded-full bg-golf-green mt-2 shrink-0" />
                {t(key)}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mb-12">
        <h3 className="text-xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-golf-green">
          {t("howItWorksSectionTitle")}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map(({ num, titleKey, descKey }) => (
            <div key={num} className="text-center">
              <div className="w-12 h-12 bg-golf-green text-white rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-3">
                {num}
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">{t(titleKey)}</h4>
              <p className="text-sm text-gray-600">{t(descKey)}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-12">
        <h3 className="text-xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-golf-green">
          {t("specsSectionTitle")}
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-golf-green text-white">
                <th className="text-left px-4 py-3 font-semibold w-1/3">{t("specsCol1")}</th>
                <th className="text-left px-4 py-3 font-semibold">{t("specsCol2")}</th>
              </tr>
            </thead>
            <tbody>
              {specs.map(([nameKey, valueKey], idx) => (
                <tr key={nameKey} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="px-4 py-3 font-medium text-gray-700 border-b border-gray-100">
                    {t(nameKey)}
                  </td>
                  <td className="px-4 py-3 text-gray-600 border-b border-gray-100">
                    {t(valueKey)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mb-12">
        <h3 className="text-xl font-bold text-gray-900 mb-2 pb-2 border-b-2 border-golf-green text-center">
          제품 시연 영상
        </h3>
        <p className="text-gray-500 text-center mb-6">디오 F-1 실제 운행 모습</p>
        <div className="rounded-xl overflow-hidden shadow-xl">
          <video
            src="/videos/dio-robot-overview.mp4"
            controls
            muted
            playsInline
            className="w-full"
          >
            <p className="text-center text-gray-500 p-8">브라우저가 동영상을 지원하지 않습니다.</p>
          </video>
        </div>
      </div>

      <div className="mb-12 text-center">
        <a
          href="/brochures/dio-f1-brochure.pdf"
          download
          className="inline-flex items-center justify-center gap-2 bg-golf-gold text-golf-dark px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
        >
          <Download className="w-5 h-5" />
          제품소개서 다운로드 (PDF)
        </a>
      </div>

      <div className="bg-golf-dark text-white rounded-xl p-8 text-center">
        <h3 className="text-lg font-bold mb-6">{t("contact")}</h3>
        <div className="flex flex-col sm:flex-row gap-6 justify-center text-sm">
          <div className="flex items-center gap-2 justify-center">
            <Phone className="w-4 h-4 text-golf-gold shrink-0" />
            <span>{t("contactPerson1")}</span>
          </div>
          <div className="flex items-center gap-2 justify-center">
            <Phone className="w-4 h-4 text-golf-gold shrink-0" />
            <span>{t("contactPerson2")}</span>
          </div>
          <div className="flex items-center gap-2 justify-center">
            <Phone className="w-4 h-4 text-golf-gold shrink-0" />
            <span>{t("contactOffice")}</span>
          </div>
        </div>
      </div>
    </SubPageLayout>
  );
}
