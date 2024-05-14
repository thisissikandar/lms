"use client";
import { BarChart, Compass, Layout, List } from "lucide-react";
import React from "react";
import SideNavBarItems from "./sideNavBarItems";
import { usePathname } from "next/navigation";

const guestRoutes = [
  {
    icon: Layout,
    label: "Dashboard",
    href: "/",
  },
  {
    icon: Compass,
    label: "Brouse",
    href: "/search",
  },
];
const teacherRoutes = [
  {
    icon: List,
    label: "Courses",
    href: "/teacher/courses",
  },
  {
    icon: BarChart,
    label: "Analytics",
    href: "/teacher/analytics",
  },
];
export default function SidebarRoutes() {
  const pathname = usePathname();
  const isTeacherPage = pathname?.includes("/teacher");
  const routes = isTeacherPage ? teacherRoutes : guestRoutes;
  return (
    <div className="flex flex-col w-full">
      {routes.map((item) => (
        <SideNavBarItems
          key={item.href}
          icon={item.icon}
          href={item.href}
          label={item.label}
        />
      ))}
    </div>
  );
}
