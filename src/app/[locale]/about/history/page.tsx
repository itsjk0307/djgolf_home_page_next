import { SubPageLayout } from "@/components/layout/SubPageLayout";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "About.history" });
  return { title: t("title") };
}

const historyStructure = [
  { year: "2021", side: "right", items: [{ date: "01. 01", key: "y2021_1" }] },
  {
    year: "2020",
    side: "left",
    items: [
      { date: "03. 01", key: "y2020_1" },
      { date: "03. 01", key: "y2020_2" },
      { date: "03. 01", key: "y2020_3" },
    ],
  },
  { year: "2018", side: "right", items: [{ date: "03. 02", key: "y2018_1" }] },
  {
    year: "2017",
    side: "left",
    items: [
      { date: "08. 04", key: "y2017_1" },
      { date: "06. 28", key: "y2017_2" },
    ],
  },
  {
    year: "2016",
    side: "right",
    items: [
      { date: "12. 13", key: "y2016_1" },
      { date: "03. 31", key: "y2016_2" },
      { date: "02. 05", key: "y2016_3" },
    ],
  },
  { year: "2014", side: "right", items: [{ date: "07. 11", key: "y2014_1" }] },
  {
    year: "2013",
    side: "left",
    items: [
      { date: "09. 26", key: "y2013_1" },
      { date: "05. 15", key: "y2013_2" },
    ],
  },
  {
    year: "2012",
    side: "right",
    items: [
      { date: "08. 01", key: "y2012_1" },
      { date: "08. 01", key: "y2012_2" },
      { date: "03. 23", key: "y2012_3" },
      { date: "02. 10", key: "y2012_4" },
    ],
  },
  {
    year: "2009",
    side: "left",
    items: [
      { date: "11. 26", key: "y2009_1" },
      { date: "10. 15", key: "y2009_2" },
    ],
  },
  { year: "2008", side: "right", items: [{ date: "11. 24", key: "y2008_1" }] },
  { year: "2005", side: "left", items: [{ date: "05. 12", key: "y2005_1" }] },
  {
    year: "2004",
    side: "right",
    items: [
      { date: "09. 20", key: "y2004_1" },
      { date: "07. 12", key: "y2004_2" },
    ],
  },
];

export default async function HistoryPage() {
  const t = await getTranslations("About.history");

  return (
    <SubPageLayout
      title={t("title")}
      breadcrumbs={[{ label: t("breadcrumb") }, { label: t("title") }]}
    >
      <div className="relative py-4">
        {/* Center vertical line */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
          style={{ background: "linear-gradient(180deg, #2d5a27 0%, #4a8a42 50%, #2d5a27 100%)" }}
        />

        <div className="space-y-10">
          {historyStructure.map((group, gi) => (
            <div
              key={group.year}
              className={`flex flex-col md:flex-row gap-0 md:gap-0 items-start ${
                group.side === "right" ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Card side */}
              <div
                className={`flex-1 ${
                  group.side === "right" ? "md:pl-10" : "md:pr-10 md:text-right"
                }`}
              >
                <div className="md:hidden flex items-center gap-2 mb-3">
                  <span className="bg-golf-green text-white font-black text-sm px-3 py-1 rounded-full">
                    {group.year}
                  </span>
                </div>
                <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
                  <ul className="space-y-3">
                    {group.items.map((item) => (
                      <li
                        key={item.key}
                        className={`flex gap-3 text-sm text-gray-700 ${
                          group.side === "left" ? "md:flex-row-reverse md:text-right" : ""
                        }`}
                      >
                        <span className="text-golf-green font-bold shrink-0 tabular-nums">
                          {item.date}
                        </span>
                        <span className="leading-relaxed">
                          {t(item.key as Parameters<typeof t>[0])}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Center node */}
              <div className="hidden md:flex flex-col items-center w-24 shrink-0 pt-4">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center text-white font-black text-sm z-10 shadow-lg"
                  style={{
                    background: "linear-gradient(135deg, #1a3a16, #2d5a27)",
                    boxShadow: "0 0 0 4px #f3f4f6, 0 4px 12px rgba(45,90,39,0.3)",
                  }}
                >
                  {group.year}
                </div>
              </div>

              {/* Empty opposite side */}
              <div className="hidden md:block flex-1" />
            </div>
          ))}
        </div>
      </div>
    </SubPageLayout>
  );
}
