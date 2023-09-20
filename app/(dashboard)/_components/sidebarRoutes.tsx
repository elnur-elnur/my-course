"use client";

import React from "react";
import { Compass, Layout } from "lucide-react";
import SidebarItem from "./sidebarItem";

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

const SidebarRoutes = () => {
  const routes = guestRoutes;
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
