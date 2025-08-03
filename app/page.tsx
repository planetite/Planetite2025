import React from 'react';
import Image from 'next/image';
import Planet from '@/public/Planet.png';
const Page = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-24">
      <h1 className="text-8xl text-center h-full  font-mono">Project <span className='text-[#1e9ffe]'>Mountain Dew</span></h1>
      <Image src={Planet} alt="Logo" width={400} height={400} />
    </div>
  );
};

export default Page;
