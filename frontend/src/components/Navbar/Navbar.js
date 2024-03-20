import { React } from "react";
import logoImage from "../../Resources/Images/logo.jpg";
import { Link } from "react-router-dom";

function Navbar({ isLoggedIn, handleLogoutClicked, isTradie }) {
  return (
    <nav className="bg-[#739072] dark:bg-[#4F6F52] fixed w-full z-20 top-0 start-0 border-b border-[#86A789] dark:border-[#D2E3C8]">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/">
          <span className="flex items-center space-x-3 rtl:space-x-reverse">
            <img
              src={logoImage}
              className="h-8 rounded-full"
              alt="Flowbite Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              TradeTrove
            </span>
          </span>
        </Link>

        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-[#86A789] rounded-lg bg-[#D2E3C8] md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-[#739072] dark:bg-[#4F6F52] md:dark:bg-[#4F6F52] dark:border-[#D2E3C8]">
            <li>
              <Link to="/">
                <span
                  className="block py-2 px-3 text-[#000000] rounded hover:bg-[#86A789] md:hover:bg-transparent md:hover:text-[#D2E3C8] md:p-0 dark:hover:text-[#D2E3C8] dark:text-white dark:hover:bg-[#4F6F52] md:dark:hover:bg-transparent dark:border-[#D2E3C8]"
                  aria-current="page"
                >
                  Home
                </span>
              </Link>
            </li>
            {/* <li>
               <a
                 href="#"
                 class="block py-2 px-3 text-[#000000] rounded hover:bg-[#86A789] md:hover:bg-transparent md:hover:text-[#D2E3C8] md:p-0 dark:hover:text-[#D2E3C8] dark:text-white dark:hover:bg-[#4F6F52] md:dark:hover:bg-transparent dark:border-[#D2E3C8]"
               >
                 About
               </a>
             </li> */}
            {isLoggedIn === "true" ? (
              isTradie === "true" ? (
                <>
                  <Link to="/tradie/jobs">
                    <li>
                      <a className="block py-2 px-3 text-[#000000] rounded hover:bg-[#86A789] md:hover:bg-transparent md:hover:text-[#D2E3C8] md:p-0 dark:hover:text-[#D2E3C8] dark:text-white dark:hover:bg-[#4F6F52] md:dark:hover:bg-transparent dark:border-[#D2E3C8]">
                        Jobs
                      </a>
                    </li>
                  </Link>
                  <Link to="/tradie/services">
                    <li>
                      <a className="block py-2 px-3 text-[#000000] rounded hover:bg-[#86A789] md:hover:bg-transparent md:hover:text-[#D2E3C8] md:p-0 dark:hover:text-[#D2E3C8] dark:text-white dark:hover:bg-[#4F6F52] md:dark:hover:bg-transparent dark:border-[#D2E3C8]">
                        My Services
                      </a>
                    </li>
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/customer/services">
                    <li>
                      <span className="block py-2 px-3 text-[#000000] rounded hover:bg-[#86A789] md:hover:bg-transparent md:hover:text-[#D2E3C8] md:p-0 dark:hover:text-[#D2E3C8] dark:text-white dark:hover:bg-[#4F6F52] md:dark:hover:bg-transparent dark:border-[#D2E3C8]">
                        Services
                      </span>
                    </li>
                  </Link>
                  <Link to="/customer/jobs">
                    <li>
                      <span className="block py-2 px-3 text-[#000000] rounded hover:bg-[#86A789] md:hover:bg-transparent md:hover:text-[#D2E3C8] md:p-0 dark:hover:text-[#D2E3C8] dark:text-white dark:hover:bg-[#4F6F52] md:dark:hover:bg-transparent dark:border-[#D2E3C8]">
                        My Jobs
                      </span>
                    </li>
                  </Link>
                </>
              )
            ) : (
              <></>
            )}

            {isLoggedIn === "true" ? (
              <li>
                <span
                  className="block py-2 px-3 text-[#000000] rounded hover:bg-[#86A789] md:hover:bg-transparent md:hover:text-[#D2E3C8] md:p-0 dark:hover:text-[#D2E3C8] dark:text-white dark:hover:bg-[#4F6F52] md:dark:hover:bg-transparent dark:border-[#D2E3C8]"
                  onClick={handleLogoutClicked}
                >
                  Logout
                </span>
              </li>
            ) : (
              <></>
            )}

            {/* <li>
               <a
                 href="#"
                 class="block py-2 px-3 text-[#000000] rounded hover:bg-[#86A789] md:hover:bg-transparent md:hover:text-[#D2E3C8] md:p-0 dark:hover:text-[#D2E3C8] dark:text-white dark:hover:bg-[#4F6F52] md:dark:hover:bg-transparent dark:border-[#D2E3C8]"
               >
                 Contact
               </a>
             </li> */}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
