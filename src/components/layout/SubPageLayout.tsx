import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "@/i18n/navigation";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface SubPageLayoutProps {
  title: string;
  breadcrumbs: BreadcrumbItem[];
  sidebar?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function SubPageLayout({
  title,
  breadcrumbs,
  sidebar,
  children,
  className,
}: SubPageLayoutProps) {
  return (
    <div>
      {/* Sub title bar */}
      <div className="bg-golf-green text-white py-10">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold">{title}</h1>
          <div className="flex items-center gap-1 mt-2 text-sm text-green-200">
            <Link href="/" className="hover:text-white">
              <Home className="w-3.5 h-3.5" />
            </Link>
            {breadcrumbs.map((item, i) => (
              <span key={i} className="flex items-center gap-1">
                <ChevronRight className="w-3.5 h-3.5 text-green-300" />
                {item.href ? (
                  <Link href={item.href} className="hover:text-white">{item.label}</Link>
                ) : (
                  <span className="text-white">{item.label}</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        {sidebar ? (
          <div className="flex gap-8">
            <aside className="w-56 shrink-0">{sidebar}</aside>
            <div className={cn("flex-1 min-w-0", className)}>{children}</div>
          </div>
        ) : (
          <div className={cn(className)}>{children}</div>
        )}
      </div>
    </div>
  );
}
