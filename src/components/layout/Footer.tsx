import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { MapPin, Phone, Mail, Printer, Instagram, Youtube } from "lucide-react";

export async function Footer() {
  const t = await getTranslations("Footer");

  return (
    <footer className="gradient-dark text-gray-300 mt-16">
      <div
        className="h-px"
        style={{
          background:
            "linear-gradient(90deg, #c9a84c, rgba(201,168,76,0.4), transparent)",
        }}
      />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">

          {/* Brand */}
          <div className="md:col-span-2">
            <div className="mb-5">
              <Image
                src="/images/logo.png"
                alt={t("companyName")}
                width={120}
                height={40}
                className="h-9 w-auto object-contain brightness-0 invert"
              />
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-5">
              {t("tagline1")}
              <br />
              {t("tagline2")}
            </p>
            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-golf-gold shrink-0 mt-0.5" />
                <span>{t("address")}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-golf-gold shrink-0" />
                <span>031-373-8914</span>
              </div>
              <div className="flex items-center gap-2">
                <Printer className="w-4 h-4 text-golf-gold shrink-0" />
                <span>031-373-8915</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-golf-gold shrink-0" />
                <span>info@dj-golf.co.kr</span>
              </div>
            </div>
          </div>

          {/* About links */}
          <div>
            <h4 className="text-golf-gold font-semibold mb-4 text-sm uppercase tracking-wide">
              {t("colAbout")}
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/about/greeting" className="text-gray-400 hover:text-white transition-colors">
                  {t("aboutGreeting")}
                </Link>
              </li>
              <li>
                <Link href="/about/history" className="text-gray-400 hover:text-white transition-colors">
                  {t("aboutHistory")}
                </Link>
              </li>
              <li>
                <Link href="/about/organization" className="text-gray-400 hover:text-white transition-colors">
                  {t("aboutOrganization")}
                </Link>
              </li>
              <li>
                <Link href="/about/location" className="text-gray-400 hover:text-white transition-colors">
                  {t("aboutLocation")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Business links */}
          <div>
            <h4 className="text-golf-gold font-semibold mb-4 text-sm uppercase tracking-wide">
              {t("colBusiness")}
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/business/course-management" className="text-gray-400 hover:text-white transition-colors">
                  {t("businessCourse")}
                </Link>
              </li>
              <li>
                <Link href="/performance/golf-construction" className="text-gray-400 hover:text-white transition-colors">
                  {t("businessConstruction")}
                </Link>
              </li>
              <li>
                <Link href="/research/intro" className="text-gray-400 hover:text-white transition-colors">
                  {t("businessResearch")}
                </Link>
              </li>
              <li>
                <Link href="/community/news" className="text-gray-400 hover:text-white transition-colors">
                  {t("communityNews")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h3 className="text-white font-bold uppercase tracking-widest text-sm mb-4">
              Follow Us
            </h3>
            <div className="flex flex-col gap-3">
              <a
                href="https://www.instagram.com/daejung_golf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
              >
                <Instagram className="w-4 h-4" />
                Instagram
              </a>
              <a
                href="https://www.youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
              >
                <Youtube className="w-4 h-4" />
                YouTube
              </a>
              <a
                href="https://www.tiktok.com/@user3556192945286"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.75a4.85 4.85 0 01-1.01-.06z"/>
                </svg>
                TikTok
              </a>
            </div>
          </div>

        </div>

        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500 text-center sm:text-left">
          <p>{t("copyright")}</p>
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1.5">
              <Phone className="w-3 h-3 text-golf-gold" />
              031-373-8914 / 8915
            </span>
            <span className="flex items-center gap-1.5">
              <Mail className="w-3 h-3 text-golf-gold" />
              info@dj-golf.co.kr
            </span>
          </div>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-gray-300 transition-colors">
              {t("privacy")}
            </Link>
            <Link href="/terms" className="hover:text-gray-300 transition-colors">
              {t("terms")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
