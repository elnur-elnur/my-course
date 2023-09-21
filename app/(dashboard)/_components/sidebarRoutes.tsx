"use client";

import React from "react";
import { BarChart, Compass, Layout, List } from "lucide-react";
import SidebarItem from "./sidebarItem";
import { usePathname } from "next/navigation";

const guestRoutes = [
  {
    id: 1,
    icon: Layout,
    label: "Dashboard",
    href: "/",
  },
  {
    id: 2,
    icon: Compass,
    label: "Browse",
    href: "/search",
  },
];

const teacherRoutes = [
  {
    id: 1,
    icon: List,
    label: "Courses",
    href: "/teacher/courses",
  },
  {
    id: 2,
    icon: BarChart,
    label: "Analytics",
    href: "/teacher/analytics",
  },
];

const SidebarRoutes = () => {
  const pathname = usePathname();

  const isTeacherPage = pathname?.includes("/teacher");
  const routes = isTeacherPage ? teacherRoutes : guestRoutes;

  return (
    <div className="flex flex-col w-full">
      {routes.map((route) => (
        <SidebarItem
          key={route.id}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  );
};

export default SidebarRoutes;
