"use client";

import { useState } from "react";
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
  const { data: session } = useSession();
  const t = useTranslations("Nav");
  const pathname = usePathname();

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
    <header className="w-full bg-white shadow-md sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-golf-dark text-white text-xs py-1">
        <div className="max-w-7xl mx-auto px-4 flex justify-end gap-4 items-center">
          <LocaleSwitcher />
          {session ? (
            <>
              <span className="text-gray-300">{t("greeting", { name: session.user?.name })}</span>
              <Link href="/mypage" className="hover:text-golf-gold">{t("mypage")}</Link>
              <button onClick={() => signOut()} className="hover:text-golf-gold">{t("logout")}</button>
            </>
          ) : (
            <>
              <Link href="/login" className="hover:text-golf-gold">{t("login")}</Link>
              <Link href="/register" className="hover:text-golf-gold">{t("register")}</Link>
            </>
          )}
        </div>
      </div>

      {/* Main nav */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/images/logo.png"
              alt={t("companyName")}
              width={120}
              height={40}
              priority
              className="h-10 w-auto object-contain"
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <div
                key={item.key}
                className="relative group"
                onMouseEnter={() => setActiveMenu(item.key)}
                onMouseLeave={() => setActiveMenu(null)}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-1 px-4 py-5 text-sm font-medium text-gray-700 hover:text-golf-green transition-colors",
                    activeMenu === item.key && "text-golf-green"
                  )}
                >
                  {t(item.key)}
                  <ChevronDown className="w-3 h-3" />
                </Link>

                {/* Dropdown */}
                <div className="absolute top-full left-0 bg-white shadow-lg border-t-2 border-golf-green min-w-[180px] hidden group-hover:block">
                  {item.children?.map((child) => (
                    <Link
                      key={child.key}
                      href={child.href}
                      className="block px-4 py-2.5 text-sm text-gray-600 hover:bg-golf-green hover:text-white transition-colors"
                    >
                      {t(child.key)}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </nav>

          {/* Mobile toggle */}
          <button
            className="lg:hidden p-2 text-gray-700"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t">
          {navItems.map((item) => (
            <div key={item.key}>
              <button
                className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-gray-700 border-b"
                onClick={() =>
                  setActiveMenu(activeMenu === item.key ? null : item.key)
                }
              >
                {t(item.key)}
                <ChevronDown
                  className={cn(
                    "w-4 h-4 transition-transform",
                    activeMenu === item.key && "rotate-180"
                  )}
                />
              </button>
              {activeMenu === item.key &&
                item.children?.map((child) => (
                  <Link
                    key={child.key}
                    href={child.href}
                    className="block pl-8 pr-4 py-2.5 text-sm text-gray-600 bg-gray-50 border-b hover:bg-golf-green hover:text-white"
                    onClick={() => setMobileOpen(false)}
                  >
                    {t(child.key)}
                  </Link>
                ))}
            </div>
          ))}
        </div>
      )}
    </header>
  );
}
