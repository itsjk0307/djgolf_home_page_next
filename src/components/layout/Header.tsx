"use client";

import { useEffect, useState, useRef } from "react";
import { useSession, signOut } from "next-auth/react";
import { Menu, X, ChevronDown } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { LocaleSwitcher } from "./LocaleSwitcher";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const { data: session } = useSession();
  const t = useTranslations("Nav");
  const pathname = usePathname();
  const mobileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const handler = (e: MouseEvent) => {
      if (mobileRef.current && !mobileRef.current.contains(e.target as Node)) {
        setMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [mobileOpen]);

  const navItems = [
    {
      key: "about",
      href: "/about/greeting" as const,
      children: [
        { key: "aboutGreeting", href: "/about/greeting" },
        { key: "aboutHistory", href: "/about/history" },
        { key: "aboutOrganization", href: "/about/organization" },
        { key: "aboutCi", href: "/about/ci" },
        { key: "aboutAffiliates", href: "/about/affiliates" },
        { key: "aboutCertifications", href: "/about/certifications" },
        { key: "aboutLocation", href: "/about/location" },
      ],
    },
    {
      key: "business",
      href: "/business/fields" as const,
      children: [
        { key: "businessFields", href: "/business/fields" },
        { key: "businessCourse", href: "/business/course-management" },
        { key: "businessOperation", href: "/business/operation" },
        { key: "businessDesign", href: "/business/design" },
        { key: "businessSafety", href: "/business/safety" },
        { key: "businessLandscape", href: "/business/landscape" },
      ],
    },
    {
      key: "performance",
      href: "/performance/course" as const,
      children: [
        { key: "performanceCourse", href: "/performance/course" },
        { key: "performanceGolf", href: "/performance/golf-construction" },
        { key: "performanceGeneral", href: "/performance/general-construction" },
      ],
    },
    {
      key: "research",
      href: "/research/intro" as const,
      children: [
        { key: "researchIntro", href: "/research/intro" },
        { key: "researchFields", href: "/research/fields" },
      ],
    },
    {
      key: "distribution",
      href: "/distribution/fertilizer" as const,
      children: [
        { key: "distributionFertilizer", href: "/distribution/fertilizer" },
        { key: "distributionPesticide", href: "/distribution/pesticide" },
        { key: "distributionEquipment", href: "/distribution/equipment" },
        { key: "distributionOther", href: "/distribution/other" },
        { key: "distributionShop", href: "/shop" },
      ],
    },
    {
      key: "community",
      href: "/community/news" as const,
      children: [
        { key: "communityNews", href: "/community/news" },
        { key: "communityAwards", href: "/community/awards" },
        { key: "communityPress", href: "/community/press" },
        { key: "communityGallery", href: "/community/gallery" },
      ],
    },
    {
      key: "recruit",
      href: "/recruit/jobs" as const,
      children: [
        { key: "recruitJobs", href: "/recruit/jobs" },
        { key: "recruitTalent", href: "/recruit/talent" },
      ],
    },
    {
      key: "robot",
      href: "/robot" as const,
      children: [
        { key: "robotF1", href: "/robot/f1" },
        { key: "robotR1", href: "/robot/r1" },
      ],
    },
  ];

  return (
    <>
      <header
        className={cn(
          "w-full sticky top-0 z-50 bg-[#f5f5f5] transition-shadow duration-300",
          scrolled ? "shadow-sm" : ""
        )}
      >
        <div className="max-w-screen-2xl mx-auto px-8">
          <div className="relative flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center shrink-0">
              <Image
                src="/images/logo.png"
                alt={t("companyName")}
                width={120}
                height={40}
                priority
                className="h-12 w-auto object-contain"
              />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-8 lg:gap-10 absolute left-1/2 -translate-x-1/2">
              {navItems.map((item) => {
                const isActive = pathname.startsWith("/" + item.key);
                return (
                  <div
                    key={item.key}
                    className="relative group"
                    onMouseEnter={() => setActiveMenu(item.key)}
                    onMouseLeave={() => setActiveMenu(null)}
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        "relative flex items-center gap-1 px-2 py-5 text-[13px] font-medium whitespace-nowrap transition-colors",
                        isActive
                          ? "text-[#2d5a27]"
                          : "text-gray-700 hover:text-[#2d5a27]"
                      )}
                    >
                      {t(item.key)}
                      <ChevronDown
                        className={cn(
                          "w-3 h-3 transition-transform duration-200",
                          activeMenu === item.key && "rotate-180"
                        )}
                      />
                    </Link>

                    {/* Dropdown */}
                    <div
                      className={cn(
                        "absolute top-full left-0 bg-white border border-gray-100 shadow-lg min-w-[200px] rounded-b-xl overflow-hidden",
                        "transition-all duration-200 origin-top",
                        activeMenu === item.key
                          ? "opacity-100 scale-y-100 pointer-events-auto"
                          : "opacity-0 scale-y-95 pointer-events-none"
                      )}
                    >
                      {item.children?.map((child) => (
                        <Link
                          key={child.key}
                          href={child.href}
                          className="flex items-center gap-2 px-4 py-3 text-sm text-gray-600 hover:text-[#2d5a27] hover:bg-gray-50 border-l-2 border-transparent hover:border-[#2d5a27] transition-all"
                        >
                          {t(child.key)}
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              })}
            </nav>

            {/* Right: lang + auth */}
            <div className="hidden lg:flex items-center gap-3">
              <LocaleSwitcher />
              {/* HIDDEN_UNTIL_SHOP_LAUNCH — uncomment to re-enable
              <div className="w-px h-4 bg-gray-200" />
              {session ? (
                <>
                  <Link
                    href="/mypage"
                    className="text-xs text-gray-600 hover:text-[#2d5a27] transition-colors"
                  >
                    {t("mypage")}
                  </Link>
                  <button
                    onClick={() => signOut()}
                    className="text-xs text-gray-600 hover:text-[#2d5a27] transition-colors"
                  >
                    {t("logout")}
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="text-xs text-gray-600 hover:text-[#2d5a27] transition-colors"
                  >
                    {t("login")}
                  </Link>
                  <Link
                    href="/register"
                    className="text-xs bg-[#2d5a27] text-white px-3 py-1.5 rounded-full hover:bg-[#1a3a16] transition-colors"
                  >
                    {t("register")}
                  </Link>
                </>
              )}
              */}
            </div>

            {/* Mobile toggle */}
            <button
              className="lg:hidden p-2 text-gray-600 hover:text-[#2d5a27] transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

      </header>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div ref={mobileRef} className="fixed inset-0 bg-[#f5f5f5] z-40 overflow-y-auto pt-[80px] lg:hidden">
          {/* Lang + auth row */}
          <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between bg-white/60">
            <LocaleSwitcher />
            {/* HIDDEN_UNTIL_SHOP_LAUNCH — uncomment to re-enable
            <div className="flex items-center gap-3">
              {session ? (
                <>
                  <Link
                    href="/mypage"
                    className="text-xs text-gray-600"
                    onClick={() => setMobileOpen(false)}
                  >
                    {t("mypage")}
                  </Link>
                  <button
                    onClick={() => {
                      signOut();
                      setMobileOpen(false);
                    }}
                    className="text-xs text-gray-600"
                  >
                    {t("logout")}
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="text-xs text-gray-600"
                    onClick={() => setMobileOpen(false)}
                  >
                    {t("login")}
                  </Link>
                  <Link
                    href="/register"
                    className="text-xs bg-[#2d5a27] text-white px-3 py-1 rounded-full"
                    onClick={() => setMobileOpen(false)}
                  >
                    {t("register")}
                  </Link>
                </>
              )}
            </div>
            */}
          </div>

          {/* Nav items */}
          <div className="px-4 pb-8">
            {navItems.map((item) => (
              <div key={item.key} className="border-b border-gray-100">
                <button
                  className="w-full flex items-center justify-between px-2 min-h-[48px] text-sm font-medium text-gray-700 hover:text-[#2d5a27] transition-colors"
                  onClick={() =>
                    setActiveMenu(activeMenu === item.key ? null : item.key)
                  }
                >
                  <span>{t(item.key)}</span>
                  <ChevronDown
                    className={cn(
                      "w-4 h-4 transition-transform",
                      activeMenu === item.key && "rotate-180"
                    )}
                  />
                </button>
                {activeMenu === item.key && (
                  <div className="bg-gray-50 rounded-lg mb-2">
                    {item.children?.map((child) => (
                      <Link
                        key={child.key}
                        href={child.href}
                        className="flex items-center gap-2 pl-6 pr-4 min-h-[44px] text-sm text-gray-500 hover:text-[#2d5a27] transition-colors"
                        onClick={() => setMobileOpen(false)}
                      >
                        <span className="w-1 h-1 rounded-full bg-[#2d5a27]/30 shrink-0" />
                        {t(child.key)}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
