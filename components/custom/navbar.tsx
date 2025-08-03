import Image from "next/image";
import Planet from "@/public/Planet.png";

const Navbar = () => {
    return (
        <div className="flex justify-between items-center bg-black text-white p-4 shadow-md">
            <div>
                <Image src={Planet} alt="Logo" width={40} height={40} />
            </div>
            <div className="flex space-x-6 text-lg font-medium">
                <a href="#" className="hover:text-gray-400 transition">Home</a>
                <a href="#" className="hover:text-gray-400 transition">Patch Notes</a>
                <a href="https://www.youtube.com/@projectmountaindew" className="hover:text-gray-400 transition">Socials</a>
            </div>
        </div>
    );
};

export default Navbar;