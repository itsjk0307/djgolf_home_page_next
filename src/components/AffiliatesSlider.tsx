"use client";

import Image from "next/image";

const companies = [
  "㈜대정골프",
  "㈜대정TM",
  "㈜대정F&D",
  "㈜대정하이텍",
  "㈜대정산림",
  "㈜디오",
  "㈜오복레저",
];

export function AffiliatesSlider() {
  const items = [...companies, ...companies];

  return (
    <section className="py-16 bg-white border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-center gap-4 mb-12">
          <Image
            src="/images/daejung-symbol.jpg"
            alt="Daejung Group"
            width={56}
            height={56}
            className="object-contain w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20"
          />
          <span className="text-2xl sm:text-3xl md:text-4xl font-black text-[#1a1a2e] tracking-tight">
            Daejung Group
          </span>
        </div>

        <div className="overflow-hidden">
          <div
            className="marquee-track flex"
            style={{ width: "max-content", animation: "marquee 28s linear infinite" }}
          >
            {items.map((name, i) => (
              <div
                key={i}
                className="shrink-0 w-[160px] sm:w-[200px] md:w-[240px] mr-4 flex flex-col items-center gap-3 py-6 px-4 rounded-2xl border border-gray-100 hover:border-[#2d5a27]/20 hover:shadow-md transition-all duration-200"
              >
                <Image
                  src="/images/daejung-symbol.jpg"
                  alt={name}
                  width={56}
                  height={56}
                  className="object-contain"
                />
                <p className="text-xs sm:text-sm font-semibold text-[#1a1a2e] text-center leading-snug truncate w-full">
                  {name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
