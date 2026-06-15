import { Link } from "@/i18n/navigation";
import { db } from "@/lib/db";
import { formatDate, isNew } from "@/lib/utils";
import { ArrowRight, Award, Leaf, Building2, Wrench } from "lucide-react";
import { getTranslations } from "next-intl/server";

async function getHomeData() {
  const [businessCount, notices] = await Promise.all([
    db.boardPost.count({ where: { boardId: "business" } }),
    db.boardPost.findMany({
      where: { boardId: "notice" },
      orderBy: { createdAt: "desc" },
      take: 4,
    }),
  ]);
  return { businessCount, notices };
}

export default async function HomePage() {
  const { businessCount, notices } = await getHomeData();
  const t = await getTranslations("Home");

  return (
    <div>
      {/* Hero / Main Visual */}
      <section className="relative bg-golf-dark min-h-[600px] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{ backgroundImage: "url('/images/main/visual1.jpg')" }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-24 text-white">
          <p className="text-golf-gold font-semibold tracking-widest uppercase text-sm mb-3">
            {t("heroTagline")}
          </p>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
            {t("heroTitle1")}<br />
            <span className="text-golf-gold">{t("heroTitle2")}</span>
          </h1>
          <p className="text-gray-300 text-lg mb-8 max-w-xl">{t("heroDesc")}</p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/about/greeting"
              className="bg-golf-green hover:bg-golf-green-light text-white px-8 py-3 rounded font-medium transition-colors inline-flex items-center gap-2"
            >
              {t("heroAboutBtn")} <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/business/course-management"
              className="border border-white text-white hover:bg-white hover:text-golf-dark px-8 py-3 rounded font-medium transition-colors"
            >
              {t("heroBusinessBtn")}
            </Link>
          </div>
        </div>
      </section>

      {/* Golf Course Management Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="flex-1">
              <p className="text-golf-green font-semibold text-sm uppercase tracking-wide mb-2">
                {t("courseSection")}
              </p>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {t("courseHeading")}<br />{t("courseHeading2")}
              </h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                <strong>{t("courseDelegate")}</strong> – {t("courseDelegateDesc")}
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                <strong>{t("courseManage")}</strong> –{" "}
                <span className="text-golf-green font-bold text-xl">{businessCount.toLocaleString()}</span>{" "}
                {t("courseManageCount", { count: "" }).replace(businessCount.toLocaleString(), "").trim() ||
                  t("courseManageCount", { count: businessCount })}
              </p>
              <Link
                href="/business/course-management"
                className="inline-flex items-center gap-2 text-golf-green font-medium hover:underline"
              >
                {t("courseMore")} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="flex-1 grid grid-cols-2 gap-4">
              {[
                { icon: Leaf, titleKey: "featureEco", descKey: "featureEcoDesc" },
                { icon: Award, titleKey: "featureNo1", descKey: "featureNo1Desc" },
                { icon: Building2, titleKey: "featureGroup", descKey: "featureGroupDesc" },
                { icon: Wrench, titleKey: "featureConstruct", descKey: "featureConstructDesc" },
              ].map(({ icon: Icon, titleKey, descKey }) => (
                <div key={titleKey} className="bg-gray-50 rounded-lg p-5 hover:shadow-md transition-shadow">
                  <Icon className="w-8 h-8 text-golf-green mb-3" />
                  <h3 className="font-semibold text-gray-900">{t(titleKey as Parameters<typeof t>[0])}</h3>
                  <p className="text-sm text-gray-500 mt-1">{t(descKey as Parameters<typeof t>[0])}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Construction Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">{t("constructTitle")}</h2>
            <p className="text-gray-500 mt-3">{t("constructSubtitle")}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              href="/performance/golf-construction"
              className="bg-golf-green text-white rounded-xl p-8 hover:bg-golf-green-light transition-colors"
            >
              <p className="text-green-200 text-xs uppercase tracking-wide mb-2">A Golf Course</p>
              <h3 className="text-xl font-bold mb-2">{t("golfRecord")}</h3>
              <p className="text-green-200 text-sm">{t("golfRecordDesc")}</p>
              <ArrowRight className="w-5 h-5 mt-4 text-green-300" />
            </Link>
            <Link
              href="/performance/general-construction"
              className="bg-golf-dark text-white rounded-xl p-8 hover:bg-gray-800 transition-colors"
            >
              <p className="text-gray-400 text-xs uppercase tracking-wide mb-2">Construction Data</p>
              <h3 className="text-xl font-bold mb-2">{t("generalRecord")}</h3>
              <p className="text-gray-400 text-sm">{t("generalRecordDesc")}</p>
              <ArrowRight className="w-5 h-5 mt-4 text-gray-400" />
            </Link>
            <div className="bg-white rounded-xl p-8 border">
              <h3 className="font-bold text-gray-900 mb-4">{t("constructFieldsTitle")}</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                {(["constructField1","constructField2","constructField3","constructField4","constructField5","constructField6","constructField7"] as const).map((key) => (
                  <li key={key} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-golf-green" />
                    {t(key)}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Notice / News */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{t("newsTitle")}</h2>
              <p className="text-gray-500 text-sm mt-1">{t("newsSubtitle")}</p>
            </div>
            <Link
              href="/community/news"
              className="text-sm text-golf-green hover:underline inline-flex items-center gap-1"
            >
              {t("newsMore")} <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="divide-y">
            {notices.length === 0 ? (
              <p className="text-gray-400 py-8 text-center">{t("noNews")}</p>
            ) : (
              notices.map((post) => (
                <div key={post.id} className="flex items-center justify-between py-4 gap-4">
                  <Link
                    href={`/community/news/${post.id}`}
                    className="text-gray-700 hover:text-golf-green font-medium truncate flex-1"
                  >
                    {post.subject}
                    {isNew(post.createdAt) && (
                      <span className="ml-2 bg-golf-green text-white text-[10px] px-1.5 py-0.5 rounded">
                        NEW
                      </span>
                    )}
                  </Link>
                  <span className="text-sm text-gray-400 shrink-0">{formatDate(post.createdAt)}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-golf-green text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            {t("ctaTitle")}<br />{t("ctaTitle2")}
          </h2>
          <p className="text-green-200 mb-8">{t("ctaDesc")}</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/community/inquiry"
              className="bg-white text-golf-green hover:bg-gray-100 px-8 py-3 rounded font-semibold transition-colors"
            >
              {t("ctaInquiry")}
            </Link>
            <Link
              href="/about/location"
              className="border border-white text-white hover:bg-golf-green-light px-8 py-3 rounded font-semibold transition-colors"
            >
              {t("ctaLocation")}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
