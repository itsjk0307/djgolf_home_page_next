import { PageHero } from "@/components/PageHero";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface SubPageLayoutProps {
  title: string;
  breadcrumbs: BreadcrumbItem[];
  sidebar?: ReactNode;
  children: ReactNode;
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
      <PageHero title={title} breadcrumbs={breadcrumbs} />
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
