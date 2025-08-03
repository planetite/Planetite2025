import Image from "next/image";
import Planet from "@/public/Planet.png";
import { currentUser } from "@/lib/auth";

const Navbar = async () => {
  const user = await currentUser();

  return (
    <div className="flex justify-between items-center p-4 ">
      <div>
        <Image src={Planet} alt="Logo" width={30} height={30} />
      </div>
      <div className="flex space-x-10 text-sm font-mono font-medium mr-3">
        <a href="/" className="hover:text-gray-400 transition">Home</a>
        <a href="/patchnotes" className="hover:text-gray-400 transition">Patch Notes</a>
        <a href="https://www.youtube.com/@projectmountaindew" className="hover:text-gray-400 transition">Youtube</a>
        {user ? (
          <span className="text-[#1e9ffe] font-light">Hi, {user.name}</span>
        ) : (
          <a href="/login" className="text-[#1e9ffe]">Login</a>
        )}
      </div>
    </div>
  );
};

export default Navbar;
