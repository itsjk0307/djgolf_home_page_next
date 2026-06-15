import { SubPageLayout } from "@/components/layout/SubPageLayout";
import { getTranslations } from "next-intl/server";
import { Download, Phone } from "lucide-react";
import ImageCarousel from "@/components/ImageCarousel";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Robot" });
  return { title: t("r1.name") };
}

export default async function R1Page() {
  const t = await getTranslations("Robot");

  type RobotKey = Parameters<typeof t>[0];

  const benefits: RobotKey[] = ["r1.benefit1", "r1.benefit2"];

  const specs: [RobotKey, RobotKey][] = [
    ["r1.spec1Name", "r1.spec1Value"],
    ["r1.spec2Name", "r1.spec2Value"],
    ["r1.spec3Name", "r1.spec3Value"],
    ["r1.spec4Name", "r1.spec4Value"],
    ["r1.spec5Name", "r1.spec5Value"],
    ["r1.spec6Name", "r1.spec6Value"],
    ["r1.spec7Name", "r1.spec7Value"],
    ["r1.spec8Name", "r1.spec8Value"],
  ];

  return (
    <SubPageLayout
      title={t("r1.name")}
      breadcrumbs={[
        { label: t("breadcrumb"), href: "/robot" },
        { label: t("r1.breadcrumb") },
      ]}
    >
      <div className="flex flex-col md:flex-row gap-8 items-center mb-12">
        <div className="w-full md:w-2/5">
          <ImageCarousel
            images={[
              { src: "/images/robot/r-1.png", alt: "디오 R-1 정면" },
              { src: "/images/robot/r-1.1.jpg", alt: "디오 R-1 측면" },
              { src: "/images/robot/r-1.2.jpg", alt: "디오 R-1 운행" },
            ]}
            autoPlayInterval={3000}
          />
        </div>
        <div className="w-full md:w-3/5">
          <p className="text-sm font-semibold text-golf-green uppercase tracking-widest mb-2">
            {t("r1.type")}
          </p>
          <h2 className="text-4xl font-bold text-golf-dark mb-3">{t("r1.name")}</h2>
          <p className="text-lg font-semibold text-golf-green mb-3">{t("r1.tagline")}</p>
          <p className="text-gray-600 leading-relaxed">{t("r1.description")}</p>
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
        <p className="text-gray-500 text-center mb-6">디오 R-1 및 자율주행 로봇 소개</p>
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
          href="/brochures/dio-r1-brochure.pdf"
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
