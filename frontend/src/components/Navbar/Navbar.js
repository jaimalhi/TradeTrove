import { React } from "react";
import logoImage from "../../Resources/Images/logo.jpg";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom"; // Use NavLink for active link styling

function Navbar({ isLoggedIn, handleLogoutClicked, isTradie }) {
  const navigate = useNavigate();

  return (
    <nav className="bg-[#739072] dark:bg-[#4F6F52] fixed w-full z-20 top-0 start-0 border-b border-[#86A789] dark:border-[#D2E3C8]">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <NavLink to="/">
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
        </NavLink>

        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-[#86A789] rounded-lg bg-[#D2E3C8] md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-[#739072] dark:bg-[#4F6F52] md:dark:bg-[#4F6F52] dark:border-[#D2E3C8]">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "block py-2 px-3 text-white rounded md:p-0 dark:text-white"
                    : "block py-2 px-3 text-[#000000] rounded hover:bg-[#86A789] md:hover:bg-transparent md:hover:text-[#D2E3C8] md:p-0 dark:hover:text-[#D2E3C8] dark:text-white dark:hover:bg-[#4F6F52] md:dark:hover:bg-transparent dark:border-[#D2E3C8]"
                }
                aria-current="page"
              >
                Home
              </NavLink>
            </li>
            {isLoggedIn === "true" ? (
              isTradie === "true" ? (
                <>
                  <li>
                    <NavLink
                      to="/tradie/jobs"
                      className={({ isActive }) =>
                        isActive
                          ? "block py-2 px-3 text-white rounded md:p-0 dark:text-white"
                          : "block py-2 px-3 text-[#000000] rounded hover:bg-[#86A789] md:hover:bg-transparent md:hover:text-[#D2E3C8] md:p-0 dark:hover:text-[#D2E3C8] dark:text-white dark:hover:bg-[#4F6F52] md:dark:hover:bg-transparent dark:border-[#D2E3C8]"
                      }
                      aria-current="page"
                    >
                      Jobs
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="/tradie/services"
                      className={({ isActive }) =>
                        isActive
                          ? "block py-2 px-3 text-white rounded md:p-0 dark:text-white"
                          : "block py-2 px-3 text-[#000000] rounded hover:bg-[#86A789] md:hover:bg-transparent md:hover:text-[#D2E3C8] md:p-0 dark:hover:text-[#D2E3C8] dark:text-white dark:hover:bg-[#4F6F52] md:dark:hover:bg-transparent dark:border-[#D2E3C8]"
                      }
                    >
                      My Services
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <NavLink
                      to="/customer/services"
                      className={({ isActive }) =>
                        isActive
                          ? "block py-2 px-3 text-white rounded md:p-0 dark:text-white"
                          : "block py-2 px-3 text-[#000000] rounded hover:bg-[#86A789] md:hover:bg-transparent md:hover:text-[#D2E3C8] md:p-0 dark:hover:text-[#D2E3C8] dark:text-white dark:hover:bg-[#4F6F52] md:dark:hover:bg-transparent dark:border-[#D2E3C8]"
                      }
                    >
                      Services
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="/customer/jobs"
                      className={({ isActive }) =>
                        isActive
                          ? "block py-2 px-3 text-white rounded md:p-0 dark:text-white"
                          : "block py-2 px-3 text-[#000000] rounded hover:bg-[#86A789] md:hover:bg-transparent md:hover:text-[#D2E3C8] md:p-0 dark:hover:text-[#D2E3C8] dark:text-white dark:hover:bg-[#4F6F52] md:dark:hover:bg-transparent dark:border-[#D2E3C8]"
                      }
                    >
                      My Jobs
                    </NavLink>
                  </li>
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
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
