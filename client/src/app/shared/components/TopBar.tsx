// "use client";
import React from "react";
import Image from "next/image";
import Sidebar from "./Sidebar";
import { useAuthentication } from "../hooks/use-authentication";

interface TopBarProps {
  showSidebar: boolean;
  userRole: string;
}

export default async function TopBar( { showSidebar, userRole }: TopBarProps) {
  // const showSidebar = user !== null;
  const color = userRole === "doctor" ? "bg-blue-900" : "bg-red-900";

  return (
    <div className={`${color} flex justify-between items-center p-2 text-white h-20`}>
      <div className="flex items-center">
        {showSidebar && <Sidebar userRole={userRole ?? ""}/>}
        <span className="text-2xl font-bold mr-5 ml-10">ECG SYSTEM</span>
        <Image
          src="/logos/Interactive.png"
          alt="Heart Icon"
          width={40}
          height={40}
          className="mr-2"
        />
      </div>
      <div className="flex items-center">
      <Image
          src="/logos/logo-ufmg.png"
          alt="Logo 1"
          width={60}
          height={60}
          className="mr-12 ml-12"
        />
      </div>
    </div>
  );
};