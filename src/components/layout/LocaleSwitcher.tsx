"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { useTransition } from "react";
import { Globe } from "lucide-react";

const localeLabels: Record<string, string> = {
  ko: "한국어",
  en: "English",
  zh: "中文",
  ja: "日本語",
};

export function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  function onSelect(next: string) {
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  }

  return (
    <div className="relative group">
      <button
        className="flex items-center gap-1 text-xs text-gray-300 hover:text-white transition-colors"
        aria-label="Switch language"
      >
        <Globe className="w-3.5 h-3.5" />
        <span>{localeLabels[locale]}</span>
      </button>
      <div className="absolute right-0 top-full mt-1 bg-golf-dark border border-gray-700 rounded shadow-lg hidden group-hover:block min-w-[90px] z-50">
        {Object.entries(localeLabels).map(([code, label]) => (
          <button
            key={code}
            disabled={isPending || code === locale}
            onClick={() => onSelect(code)}
            className={`w-full text-left px-3 py-2 text-xs transition-colors ${
              code === locale
                ? "text-golf-gold cursor-default"
                : "text-gray-300 hover:text-white hover:bg-gray-700"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
