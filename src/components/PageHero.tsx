import { ChevronRight, Home } from "lucide-react";
import { Link } from "@/i18n/navigation";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeroProps {
  title: string;
  breadcrumbs: BreadcrumbItem[];
}

export function PageHero({ title, breadcrumbs }: PageHeroProps) {
  return (
    <div
      className="relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #1a3a16 0%, #2d5a27 50%, #4a8a42 100%)",
        clipPath: "polygon(0 0, 100% 0, 100% 82%, 0 100%)",
        minHeight: "210px",
      }}
    >
      {/* Dot pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      {/* Gold accent line at top */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5"
        style={{ background: "linear-gradient(90deg, #c9a84c, rgba(201,168,76,0.3), transparent)" }}
      />
      <div className="relative z-10 max-w-7xl mx-auto px-4 pt-10 pb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
          {title}
        </h1>
        <div className="flex items-center gap-1.5 text-sm text-white/60 flex-wrap">
          <Link href="/" className="hover:text-white transition-colors flex items-center">
            <Home className="w-3.5 h-3.5" />
          </Link>
          {breadcrumbs.map((item, i) => (
            <span key={i} className="flex items-center gap-1.5">
              <ChevronRight className="w-3.5 h-3.5 text-white/30" />
              {item.href ? (
                <Link href={item.href} className="hover:text-white transition-colors">
                  {item.label}
                </Link>
              ) : (
                <span className="text-white/90 font-medium">{item.label}</span>
              )}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
