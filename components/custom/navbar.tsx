import Image from "next/image";
import Planet from "@/public/Planet.png";
import { currentUser } from "@/lib/auth";
import { FaYoutube } from "react-icons/fa";
const Navbar = async () => {
  const user = await currentUser();

  return (
    <div className="absolute w-full h-16">
      <div className="flex justify-between items-center p-4 h-full">
        <div>
          <a href="/"><Image src={Planet} alt="Logo" width={30} height={30} /></a>
        </div>
        <div className="flex space-x-4 md:space-x-10 text-xs md:text-sm font-mono font-medium md:mr-3">
          <a href="/" className="hover:text-gray-400 transition">Home</a>
          <a href="/patchnotes" className="hover:text-gray-400 transition">Patch Notes</a>
          <a href="https://www.youtube.com/@projectmountaindew" className="hover:text-gray-400 transition flex justify-center items-center
          ">YT</a>
          {user ? (
            <span className="text-[#1e9ffe] font-light">Hi, {user.name}</span>
          ) : (
            <a href="/login" className="text-[#1e9ffe]">Login</a>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
