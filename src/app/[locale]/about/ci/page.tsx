import { SubPageLayout } from "@/components/layout/SubPageLayout";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "About.ci" });
  return { title: t("title") };
}

export default async function CiPage() {
  const t = await getTranslations("About.ci");

  const affiliates = ["a1", "a2", "a3", "a4", "a5", "a6", "a7"] as const;
  const colors = [
    { hex: "#13a89e", label: "① " },
    { hex: "#25aae1", label: "② " },
    { hex: "#0e76bc", label: "③ " },
    { hex: "#283891", label: "④ " },
    { hex: "#056839", label: "⑤ " },
    { hex: "#39b54a", label: "⑥ " },
    { hex: "#8dc63f", label: "⑦ " },
  ];

  return (
    <SubPageLayout
      title={t("title")}
      breadcrumbs={[{ label: t("breadcrumb") }, { label: t("title") }]}
    >
      {/* Symbol mark */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-golf-green border-b-2 border-golf-green pb-2 mb-6">
          {t("symbolTitle")}
        </h2>
        <div className="bg-gray-50 rounded-xl p-8 flex flex-col md:flex-row gap-8 items-start">
          <div className="w-48 h-48 bg-white rounded-xl shadow flex items-center justify-center shrink-0">
            <span className="text-gray-400 text-sm text-center px-4">{t("logoPlaceholder")}</span>
          </div>
          <div className="flex-1">
            <p className="text-gray-700 leading-relaxed mb-6">{t("symbolDesc")}</p>
            <h3 className="font-semibold text-gray-900 mb-3">{t("affiliatesTitle")}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {affiliates.map((key, i) => (
                <div key={key} className="flex items-center gap-3">
                  <div
                    className="w-4 h-4 rounded-full shrink-0"
                    style={{ backgroundColor: colors[i].hex }}
                  />
                  <span className="text-gray-700 text-sm">{t(key)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Brand colors */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-golf-green border-b-2 border-golf-green pb-2 mb-6">
          {t("colorTitle")}
        </h2>
        <p className="text-gray-600 mb-6">{t("colorDesc")}</p>
        <div className="grid grid-cols-4 sm:grid-cols-7 gap-3">
          {colors.map((c, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <div
                className="w-12 h-12 rounded-full shadow-md"
                style={{ backgroundColor: c.hex }}
              />
              <span className="text-xs text-gray-500 font-mono">{c.hex}</span>
              <span className="text-xs text-gray-600 text-center">{t(affiliates[i])}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Logotype */}
      <section>
        <h2 className="text-xl font-bold text-golf-green border-b-2 border-golf-green pb-2 mb-6">
          {t("logotypeTitle")}
        </h2>
        <div className="bg-gray-50 rounded-xl p-8 flex flex-col md:flex-row gap-8 items-center">
          <div className="w-64 h-20 bg-white rounded-lg shadow flex items-center justify-center shrink-0">
            <span className="text-golf-green font-bold text-2xl">DAEJUNG GOLF</span>
          </div>
          <p className="text-gray-700 leading-relaxed">{t("logotypeDesc")}</p>
        </div>
      </section>
    </SubPageLayout>
  );
}
