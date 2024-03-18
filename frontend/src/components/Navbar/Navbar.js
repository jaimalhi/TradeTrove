import React from "react";
import logoImage from "../../Resources/Images/logo.jpg";
import { Link } from "react-router-dom";

const listItems = {
   home: 1,
   services: 2,
   profile: 3,
};

function Navbar() {
   return (
      <nav className="bg-[#739072] dark:bg-[#4F6F52] fixed w-full z-20 top-0 start-0 border-b border-[#86A789] dark:border-[#D2E3C8]">
         <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <Link to="/">
               <span className="flex items-center space-x-3 rtl:space-x-reverse">
                  <img src={logoImage} className="h-8 rounded-full" alt="Flowbite Logo" />
                  <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                     TradeTrove
                  </span>
               </span>
            </Link>
            <div className="flex md:order-2 space-x-3 md:space-x rtl:space-x-reverse justify-between">
               <Link to="/login">
                  <button
                     type="button"
                     className="text-[#000000] bg-[#D2E3C8] hover:bg-[#86A789] focus:ring-4 focus:outline-none focus:ring-[#739072] font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-[#739072] dark:hover:bg-[#4F6F52] dark:focus:ring-[#D2E3C8]">
                     Login
                  </button>
               </Link>
               <Link to="/signup">
                  <button
                     type="button"
                     className="text-[#000000] bg-[#D2E3C8] hover:bg-[#86A789] focus:ring-4 focus:outline-none focus:ring-[#739072] font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-[#739072] dark:hover:bg-[#4F6F52] dark:focus:ring-[#D2E3C8]">
                     Sign Up
                  </button>
               </Link>
            </div>
            <div
               className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
               id="navbar-sticky">
               <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-[#86A789] rounded-lg bg-[#D2E3C8] md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-[#739072] dark:bg-[#4F6F52] md:dark:bg-[#4F6F52] dark:border-[#D2E3C8]">
                  <li>
                     <a
                        href="/"
                        className="block py-2 px-3 text-[#000000] bg-[#D2E3C8] rounded md:bg-transparent md:text-[#D2E3C8] md:p-0 dark:text-[#D2E3C8]"
                        aria-current="page">
                        Home
                     </a>
                  </li>
                  <li>
                     <a
                        href="#"
                        className="block py-2 px-3 text-[#000000] rounded hover:bg-[#86A789] md:hover:bg-transparent md:hover:text-[#D2E3C8] md:p-0 dark:hover:text-[#D2E3C8] dark:text-white dark:hover:bg-[#4F6F52] md:dark:hover:bg-transparent dark:border-[#D2E3C8]">
                        Profile
                     </a>
                  </li>
                  <li>
                     <a
                        href="/tradieServicesPage"
                        className="block py-2 px-3 text-[#000000] rounded hover:bg-[#86A789] md:hover:bg-transparent md:hover:text-[#D2E3C8] md:p-0 dark:hover:text-[#D2E3C8] dark:text-white dark:hover:bg-[#4F6F52] md:dark:hover:bg-transparent dark:border-[#D2E3C8]">
                        Services
                     </a>
                  </li>
               </ul>
            </div>
         </div>
      </nav>
   );
}

export default Navbar;
