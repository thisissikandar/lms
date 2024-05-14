"use client";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

interface SideBarItemsProps {
  icon: LucideIcon;
  href: string;
  label: string;
}
export default function SideNavBarItems({
  icon: Icon,
  href,
  label,
}: SideBarItemsProps) {
  const pathname = usePathname();
  const router = useRouter();
  const isActive =
    (pathname === "/" && href === "/") ||
    pathname === href ||
    pathname?.startsWith(`${href}/`);

  const onclick = () => {
    router.push(href);
  };
  return (
   
      <button
        onClick={onclick}
        type="button"
        className={cn(
          "flex items-center gap-x-2 text-slate-500 text-sm font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20",
          isActive &&
            "text-sky-500 bg-sky-200/20 hover:bg-sky-200/20 hover:text-sky-700"
        )}
      >
        <div className="flex items-center gap-x-2 py-2">
          <Icon
            size={22}
            className={cn("text-slate-500", isActive && "text-sky-700")}
          />
          {label}
        </div>
        <div
          className={cn(
            "ml-auto opacity-0 border-2 border-sky-700 h-full transition-all",
            isActive && "opacity-100"
          )}
        />
      </button>
  );
}
