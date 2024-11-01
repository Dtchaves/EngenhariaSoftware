import { ArrowRightIcon, XMarkIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import Link from "next/link";
import { DoctorOptions } from "../utils";

const Sidebar = () => {
  // State to manage the open/close state of the sidebar
  const [isOpen, setIsOpen] = useState(false);
  const menu = DoctorOptions;

  return (
    <div className="flex">
      <div
        className={`bg-blue-500 text-white 
                    fixed h-screen transition-all 
                    duration-300 z-10 
                    ${isOpen ? "w-64" : "w-0 overflow-hidden"}`}
      >
        <div className="flex flex-col items-center mt-4">
          {menu.map((item, index) => (
            <div key={index} className="mt-4">
              <Link href={item.href} className="text-white hover:text-gray-300">
                {item.label}
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div
        className={`flex-1 p-4 
                        ${isOpen ? "ml-64" : "ml-0"}`}
      >
        <div className="ml-auto">
          <button
            className="bg-blue-500 hover:bg-blue-700 
                       text-white font-bold py-2 px-4 rounded"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <ArrowRightIcon className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
