import React from 'react';
import Image from 'next/image';
import Planet from '@/public/Planet.png';

const Page = () => {
  return (
    <main className="flex flex-col items-center justify-center gap-6 font-mono h-screen">
      <header className="text-center">
        <h1 className="text-5xl lg:text-8xl font-thin">
          Project <span className="text-[#1e9ffe]">Mountain Dew</span>
        </h1>
      </header>
      <section className="flex flex-col items-center">
        <Image src={Planet} alt="Planet Logo" className="w-32 h-32 md:w-48 md:h-48 lg:w-56 lg:h-56 object-contain my-10 animate-[spin_4s_linear_infinite]" />
        <p className="mt-4 md:mt-8 text-lg md:text-2xl text-gray-600">COMING SOON</p>
      </section>
        <div className=' text-center text-sm absolute bottom-5 text-gray-600 font-thin'>Made by Abhinav, Chaitanya & Malhar</div>
    </main>
  );
};

export default Page;
