import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export async function Footer() {
  const t = await getTranslations("Footer");

  return (
    <footer className="bg-golf-dark text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="mb-4">
              <div className="inline-block bg-white rounded px-3 py-2">
                <Image
                  src="/images/logo.png"
                  alt={t("companyName")}
                  width={120}
                  height={40}
                  className="h-9 w-auto object-contain"
                />
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              {t("tagline1")}<br />
              {t("tagline2")}
            </p>
            <div className="mt-4 text-sm space-y-1 text-gray-400">
              <p>{t("address")}</p>
              <p>Tel: 031-000-0000 &nbsp;|&nbsp; Fax: 031-000-0000</p>
              <p>E-mail: info@dj-golf.co.kr</p>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">{t("colAbout")}</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about/greeting" className="hover:text-golf-gold transition-colors">{t("aboutGreeting")}</Link></li>
              <li><Link href="/about/history" className="hover:text-golf-gold transition-colors">{t("aboutHistory")}</Link></li>
              <li><Link href="/about/organization" className="hover:text-golf-gold transition-colors">{t("aboutOrganization")}</Link></li>
              <li><Link href="/about/location" className="hover:text-golf-gold transition-colors">{t("aboutLocation")}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">{t("colBusiness")}</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/business/course-management" className="hover:text-golf-gold transition-colors">{t("businessCourse")}</Link></li>
              <li><Link href="/performance/golf-construction" className="hover:text-golf-gold transition-colors">{t("businessConstruction")}</Link></li>
              <li><Link href="/research/intro" className="hover:text-golf-gold transition-colors">{t("businessResearch")}</Link></li>
              <li><Link href="/community/news" className="hover:text-golf-gold transition-colors">{t("communityNews")}</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>{t("copyright")}</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-gray-300">{t("privacy")}</Link>
            <Link href="/terms" className="hover:text-gray-300">{t("terms")}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
