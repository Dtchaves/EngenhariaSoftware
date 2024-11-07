import React from "react";
import Image from "next/image";
import Sidebar from "./Sidebar";
import { usePathname } from "next/navigation";

<<<<<<< Updated upstream
const TopBar = () => {
  const pathname = usePathname();
  const showSidebar = pathname !== "/login" && pathname !== "/register";
=======
interface TopBarProps {
  showSidebar: boolean;
  userRole: string;
}

export default async function TopBar({ showSidebar, userRole }: TopBarProps) {
  const color = 
    userRole === "doctor" ? "bg-blue-900" : 
    userRole === "patient" ? "bg-red-900" : 
    "bg-gray-900"; 
>>>>>>> Stashed changes

  return (
    <div className="bg-blue-900 flex justify-between items-center p-2 text-white h-20">
      <div className="flex items-center">
<<<<<<< Updated upstream
        {showSidebar && <Sidebar />}
=======
        {showSidebar && <Sidebar userRole={userRole ?? ""} />}
>>>>>>> Stashed changes
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
        <a href="https://ufmg.br" target="_blank" rel="noopener noreferrer">
          <Image
            src="/logos/logo-ufmg.png"
            alt="Logo 1"
            width={90}
            height={90}
            className="mr-12 ml-12"
          />
        </a>
      </div>
    </div>
  );
};
<<<<<<< Updated upstream

export default TopBar;
=======
>>>>>>> Stashed changes
