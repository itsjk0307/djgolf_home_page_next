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
      <div className="relative">
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-golf-green -translate-x-1/2" />
        <div className="space-y-8">
          {historyStructure.map((group) => (
            <div
              key={group.year}
              className={`flex flex-col md:flex-row gap-4 md:gap-0 ${
                group.side === "right" ? "md:flex-row-reverse" : ""
              }`}
            >
              <div className="hidden md:flex items-start justify-center w-16 shrink-0 mx-auto relative">
                <div className="bg-golf-green text-white font-bold text-sm px-2 py-1 rounded z-10">
                  {group.year}
                </div>
              </div>
              <div className={`flex-1 ${group.side === "right" ? "md:pl-8" : "md:pr-8 md:text-right"}`}>
                <div className="md:hidden text-golf-green font-bold text-lg mb-2">{group.year}</div>
                <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                  <ul className="space-y-2">
                    {group.items.map((item) => (
                      <li key={item.key} className="text-sm text-gray-700">
                        <span className="text-golf-green font-semibold mr-2">{item.date}</span>
                        {t(item.key as Parameters<typeof t>[0])}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="hidden md:block flex-1" />
            </div>
          ))}
        </div>
      </div>
    </SubPageLayout>
  );
}
