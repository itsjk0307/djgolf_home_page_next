"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { useTransition, useState, useEffect, useRef } from "react";
import { Globe, ChevronDown } from "lucide-react";

const locales = [
  { code: "ko", name: "한국어" },
  { code: "en", name: "English" },
  { code: "zh", name: "中文" },
  { code: "ja", name: "日本語" },
];

export function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const currentName = locales.find((l) => l.code === locale)?.name ?? locale;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  function switchLocale(next: string) {
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 text-sm text-gray-600 hover:text-[#2d5a27] px-3 py-1.5 rounded-lg hover:bg-gray-200 transition-colors"
      >
        <Globe className="w-4 h-4" />
        <span>{currentName}</span>
        <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-1 bg-white rounded-xl shadow-lg border border-gray-100 py-1 min-w-[120px] z-50">
          {locales.map((l) => (
            <button
              key={l.code}
              disabled={isPending || l.code === locale}
              onClick={() => { switchLocale(l.code); setOpen(false); }}
              className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                l.code === locale
                  ? "text-[#2d5a27] font-semibold bg-gray-50"
                  : "text-gray-600 hover:text-[#2d5a27] hover:bg-gray-50"
              }`}
            >
              {l.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
