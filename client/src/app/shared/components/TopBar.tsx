import React from 'react';
import Image from 'next/image';

const TopBar = () => {
  return (
    <div className="bg-blue-900 flex justify-between items-center p-2 text-white h-20">
      <div className="flex items-center">
        <span className="text-2xl font-bold mr-5 ml-10">ECG SYSTEM</span>
        <Image src="/logos/Interactive.png" alt="Heart Icon" width={10} height={10} className="mr-2" />
      </div>
      <div className="flex items-center">
        <Image src="/logos/logo-ufmg.png" alt="Logo 1" width={9} height={9} className="mr-12 ml-12" />
      </div>
    </div>
  );
};

export default TopBar;