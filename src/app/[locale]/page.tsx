import { Link } from "@/i18n/navigation";
import { AffiliatesSlider } from "@/components/AffiliatesSlider";
import CountUp from "@/components/CountUp";
import CourseSlider from "@/components/CourseSlider";
import { db } from "@/lib/db";
import { formatDate, isNew } from "@/lib/utils";
import { ArrowRight, ChevronRight, Leaf, Building2, FlaskConical, Package, ClipboardList, Bot, TrendingUp, Flag, Users } from "lucide-react";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

async function getHomeData() {
  const notices = await db.boardPost.findMany({
    where: { boardId: "notice" },
    orderBy: { createdAt: "desc" },
    take: 3,
  });
  return { notices };
}

const courseImages = [
  { src: "/images/courses/biz3_1.jpg",  name: "사이프러스 골프&리조트", link: "http://www.cypress.co.kr/" },
  { src: "/images/courses/biz3_2.jpg",  name: "피닉스파크 CC" },
  { src: "/images/courses/biz3_3.jpg",  name: "오션노 CC" },
  { src: "/images/courses/biz3_4.jpg",  name: "파인비치 CC" },
  { src: "/images/courses/biz3_5.jpg",  name: "베어즈베스트 청라" },
  { src: "/images/courses/biz3_6.jpg",  name: "JNJ CC" },
  { src: "/images/courses/biz3_7.jpg",  name: "롯데 스카이힐" },
  { src: "/images/courses/biz3_8.jpg",  name: "더오션 CC" },
  { src: "/images/courses/biz3_9.jpg",  name: "용평리조트" },
  { src: "/images/courses/biz3_10.jpg", name: "핀크스 GC" },
  { src: "/images/courses/biz3_11.jpg", name: "미다스 이천" },
  { src: "/images/courses/biz3_12.jpg", name: "골든베이 GC" },
  { src: "/images/courses/biz3_13.jpg", name: "J퍼블릭" },
  { src: "/images/courses/biz3_14.jpg", name: "메이플비치 GC" },
  { src: "/images/courses/biz3_15.jpg", name: "버치힐 CC" },
  { src: "/images/courses/biz3_16.jpg", name: "캐슬파인 GC" },
  { src: "/images/courses/biz3_17.jpg", name: "미다스 밸리" },
  { src: "/images/courses/biz3_18.jpg", name: "남촌 CC" },
  { src: "/images/courses/biz3_19.jpg", name: "그랜드 CC" },
  { src: "/images/courses/biz3_20.jpg", name: "블루원 상주" },
  { src: "/images/courses/biz3_21.jpg", name: "레이크힐스 CC" },
  { src: "/images/courses/biz3_22.jpg", name: "파인힐스 CC" },
  { src: "/images/courses/biz3_23.jpg", name: "써밋 CC" },
  { src: "/images/courses/biz3_24.jpg", name: "더링크스 CC" },
  { src: "/images/courses/biz3_25.jpg", name: "힐마루 CC" },
  { src: "/images/courses/biz3_26.jpg", name: "스카이72 CC" },
  { src: "/images/courses/biz3_27.jpg", name: "아도니스 CC" },
  { src: "/images/courses/biz3_28.jpg", name: "웰링턴 CC" },
  { src: "/images/courses/biz3_29.jpg", name: "파인크리크 CC" },
  { src: "/images/courses/biz3_30.jpg", name: "선운 CC" },
  { src: "/images/courses/biz3_31.jpg", name: "레이크사이드 CC" },
  { src: "/images/courses/biz3_32.jpg", name: "남해 CC" },
  { src: "/images/courses/biz3_33.jpg", name: "클럽 모우 CC" },
  { src: "/images/courses/biz3_34.jpg", name: "제주 CC" },
  { src: "/images/courses/biz3_35.jpg", name: "양지파인 CC" },
  { src: "/images/courses/biz3_36.jpg", name: "엘리시안 CC" },
  { src: "/images/courses/biz3_37.jpg", name: "힐데스하임 CC" },
  { src: "/images/courses/biz3_38.jpg", name: "사이프러스 CC" },
];

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const { notices } = await getHomeData();
  const t = await getTranslations("Home");

  const businessCards = [
    {
      icon: Leaf,
      titleKey: "featureEco" as const,
      descKey: "featureEcoDesc" as const,
      href: "/business/course-management",
      isNew: false,
    },
    {
      icon: Building2,
      titleKey: "featureConstruct" as const,
      descKey: "featureConstructDesc" as const,
      href: "/performance/golf-construction",
      isNew: false,
    },
    {
      icon: FlaskConical,
      titleKey: "card3Title" as const,
      descKey: "card3Desc" as const,
      href: "/research/intro",
      isNew: false,
    },
    {
      icon: Package,
      titleKey: "card4Title" as const,
      descKey: "card4Desc" as const,
      href: "/distribution/fertilizer",
      isNew: false,
    },
    {
      icon: ClipboardList,
      titleKey: "card5Title" as const,
      descKey: "card5Desc" as const,
      href: "/business/operation",
      isNew: false,
    },
    {
      icon: Bot,
      titleKey: "card6Title" as const,
      descKey: "card6Desc" as const,
      href: "/robot",
      isNew: true,
    },
  ];

  return (
    <div>
      {/* ── 1. Video — full width, natural aspect ratio (no crop) */}
      <section className="w-full overflow-hidden bg-[#d6d6d6] leading-[0]">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="block w-full h-auto"
          src="/videos/legacy/hong_mod.mp4"
        />
      </section>

      {/* ── 2. Affiliates slider ── */}
      <AffiliatesSlider />

      {/* ── 3. Golf Course Slideshow ── */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-[2px] bg-[#2d5a27]" />
                <span className="text-[#2d5a27] text-sm font-semibold uppercase tracking-widest">
                  Golf Course Management
                </span>
              </div>
              <h2 className="text-4xl font-bold text-[#1a1a2e]">관리 골프장</h2>
            </div>
            <div className="text-right">
              <p className="text-gray-500 text-sm">Course management</p>
              <p className="text-[#2d5a27] font-semibold">
                현재 <span className="text-[#c9a84c] font-black text-xl">약 30개</span> 골프장 관리 중
              </p>
            </div>
          </div>

          <CourseSlider images={courseImages} />

          <div className="mt-10">
            <a
              href="http://www.cypress.co.kr/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col sm:flex-row items-center gap-6 p-6 rounded-2xl overflow-hidden bg-[#1a1a2e] hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer">
              <div className="absolute inset-0 hidden sm:block">
                <Image
                  src="/images/courses/biz3_1.jpg"
                  alt="Cypress Golf & Resort"
                  fill
                  className="object-cover opacity-30 group-hover:opacity-40 transition-opacity duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a2e] via-[#1a1a2e]/80 to-transparent" />
              </div>
              <div className="relative flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden bg-white p-2">
                <Image
                  src="/images/main/cypress.png"
                  alt="Cypress"
                  fill
                  className="object-contain p-1"
                />
              </div>
              <div className="relative flex-1">
                <p className="text-[#c9a84c] text-xs font-bold uppercase tracking-widest mb-1">
                  Featured Partner
                </p>
                <h3 className="text-white text-xl font-bold mb-1">
                  사이프러스 골프 & 리조트
                </h3>
                <p className="text-gray-400 text-sm">
                  대정골프가 관리하는 대표 골프장
                </p>
              </div>
              <div className="relative flex-shrink-0 w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-[#c9a84c] group-hover:border-[#c9a84c] transition-all duration-300">
                <ChevronRight className="w-5 h-5 text-white" />
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* ── 4. Stats ── */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { Icon: TrendingUp, end: 550, prefix: t("stat1Prefix"), suffix: "",  unit: t("stat1Unit"), label: t("stat1Label") },
              { Icon: Flag,       end: 30,  prefix: t("stat2Prefix"), suffix: "",  unit: t("stat2Unit"), label: t("stat2Label") },
              { Icon: Users,      end: 600, prefix: "",                suffix: "+", unit: t("stat3Unit"), label: t("stat3Label") },
              { Icon: Building2,  end: 7,   prefix: "",                suffix: "",  unit: t("stat4Unit"), label: t("stat4Label") },
            ].map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center text-center p-8 rounded-2xl bg-[#f8f9fa] border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 min-h-[200px]"
              >
                <div className="w-16 h-16 rounded-2xl bg-[#2d5a27]/10 flex items-center justify-center mb-5">
                  <stat.Icon className="w-8 h-8 text-[#2d5a27]" />
                </div>
                <div className="text-2xl md:text-3xl font-black text-[#1a1a2e] whitespace-nowrap leading-none mb-1">
                  {stat.prefix}<CountUp end={stat.end} />{stat.suffix}
                  <span className="text-[#c9a84c] ml-1">{stat.unit}</span>
                </div>
                <div className="w-8 h-[2px] bg-[#2d5a27] my-3" />
                <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. Business Cards ── */}
      <section className="bg-white py-20 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-[#2d5a27] text-xs font-bold uppercase tracking-widest mb-3">
              {t("courseSection")}
            </p>
            <h2 className="text-3xl font-black text-[#1a1a2e]">{t("courseHeading")}</h2>
            <p className="text-gray-400 mt-2">{t("courseHeading2")}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {businessCards.map(({ icon: Icon, titleKey, descKey, href, isNew: badge }) => (
              <Link
                key={titleKey}
                href={href}
                className="group relative bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                {badge && (
                  <span className="absolute top-4 right-4 text-[10px] font-black bg-[#c9a84c] text-white px-2 py-0.5 rounded-full tracking-widest">
                    NEW
                  </span>
                )}
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-[#2d5a27]/10 group-hover:bg-[#2d5a27] transition-colors duration-300">
                  <Icon className="w-6 h-6 text-[#2d5a27] group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="font-bold text-[#1a1a2e] mb-2">{t(titleKey)}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{t(descKey)}</p>
                <div className="flex items-center gap-1 mt-5 text-[#2d5a27] text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {t("courseMore")} <ArrowRight className="w-3 h-3" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. News ── */}
      <section className="bg-[#f8f9fa] py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <div>
              <p className="text-[#2d5a27] text-xs font-bold uppercase tracking-widest mb-2">
                {t("newsSubtitle")}
              </p>
              <h2 className="text-2xl font-black text-[#1a1a2e]">{t("newsTitle")}</h2>
            </div>
            <Link
              href="/community/news"
              className="text-sm text-gray-400 hover:text-[#2d5a27] inline-flex items-center gap-1 transition-colors"
            >
              {t("newsMore")} <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {notices.length === 0 ? (
              <p className="text-gray-400 col-span-3 py-8 text-center">{t("noNews")}</p>
            ) : (
              notices.map((post) => (
                <Link
                  key={post.id}
                  href={`/community/news/${post.id}`}
                  className="group bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                >
                  <p className="text-[#c9a84c] text-xs font-bold mb-3">
                    {formatDate(post.createdAt)}
                  </p>
                  <h3 className="text-[#1a1a2e] font-semibold text-sm leading-relaxed group-hover:text-[#2d5a27] transition-colors line-clamp-2">
                    {post.subject}
                    {isNew(post.createdAt) && (
                      <span className="ml-2 bg-[#2d5a27] text-white text-[10px] px-1.5 py-0.5 rounded align-middle">
                        NEW
                      </span>
                    )}
                  </h3>
                </Link>
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
