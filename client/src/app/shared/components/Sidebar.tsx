import {
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import React, { useState } from "react";
import Link from "next/link";
import { DoctorOptions } from "../utils";
import { logout } from "../hooks/logout";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menu = DoctorOptions;

  return (
    <div className="flex">
      <div
        className={`bg-blue-900 text-white 
                    fixed h-screen transition-all 
                    duration-300 z-10 
                    ${isOpen ? "w-64" : "w-0 overflow-hidden"}`}
      >
        <div className="flex flex-col items-center mt-14"> {/* Aumentei a margem superior aqui */}
          {menu.map((item, index) => (
            <div key={index} className="mt-4">
              <Link href={item.href} className="text-white hover:text-gray-300">
                {item.label}
              </Link>
            </div>
          ))}
          <div className="mt-4">
            <button
              className="text-white hover:text-gray-300"
              onClick={() => logout()}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
      <div
        className={`flex-1 p-4 
                        ${isOpen ? "ml-64" : "ml-0"}`}
      >
        <div className="ml-auto">
          <button
            className="bg-blue-900 hover:bg-blue-700 
                       text-white font-bold py-2 px-4 rounded"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
