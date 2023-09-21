import React from "react";
import MobileSidebar from "./mobileSidebar";
import NavbarRoutes from "@/components/navbarRoutes";

const Navbar = () => {
  return (
    <div className="p-4 flex items-center border-b h-full shadow-sm bg-white">
      <MobileSidebar />
      <NavbarRoutes />
    </div>
  );
};

export default Navbar;
