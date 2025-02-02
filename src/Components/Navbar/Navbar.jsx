import React, { useEffect, useState } from "react";
import { FaCity } from "react-icons/fa";
import { GiExitDoor } from "react-icons/gi";
import { IoIosBookmarks } from "react-icons/io";
import {
  IoCarSportSharp,
  IoLocationSharp,
  IoSettingsSharp,
} from "react-icons/io5";
import { SiThemodelsresource } from "react-icons/si";
import { TbCategoryFilled } from "react-icons/tb";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { axios } from "../../Server/Api";
import { RxAvatar } from "react-icons/rx";

const Navbar = () => {
  const [admin, setAdmin] = useState(false);
  const [modal, setModal] = useState(false);
  const [me, setMe] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/auth/me", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setMe(response?.data?.data);
      });
  }, []);

  const handleSignUp = () => {
    localStorage.clear();
    setModal(false);
    navigate("/login");
  };
  return (
    <header className="pt-[60px]">
      <nav className="fixed top-0 z-41 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <button
                data-drawer-target="logo-sidebar"
                data-drawer-toggle="logo-sidebar"
                aria-controls="logo-sidebar"
                type="button"
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              >
                <span className="sr-only">Open sidebar</span>
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  ></path>
                </svg>
              </button>
              <Link to={"/"} className="flex ms-2 md:me-24">
                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                  Autozoom Admin
                </span>
              </Link>
            </div>
            <div className="relative flex items-center">
              <div className="flex items-center ms-3">
                <div>
                  <button
                    type="button"
                    className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600 cursor-pointer"
                    aria-expanded="false"
                    data-dropdown-toggle="dropdown-user"
                    onClick={() => setAdmin(!admin)}
                  >
                    <span className="sr-only">Open user menu</span>
                    <RxAvatar color="#fff" size={30} />
                  </button>
                </div>
                {admin && (
                  <div
                    className="z-50 w-[200px] absolute top-5 -right-2 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-sm shadow-sm dark:bg-gray-700 dark:divide-gray-600"
                    id="dropdown-user"
                  >
                    <div className="px-4 py-3" role="none">
                      <p
                        className="text-sm text-gray-900 dark:text-white"
                        role="none"
                      >
                        {me?.first_name}
                      </p>
                      <a
                        className="text-sm font-medium text-gray-900 truncate dark:text-gray-300"
                        role="none"
                        href={`tel:${
                          me?.phone_number.startsWith("+998")
                            ? me?.phone_number
                            : "+998" + me?.phone_number
                        }`}
                      >
                        {me?.phone_number}
                      </a>
                    </div>
                    <ul className="py-1" role="none">
                      <li>
                        <Link
                          to="my-settings"
                          className="flex items-center gap-1.5 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                          role="menuitem"
                          onClick={() => setAdmin(false)}
                        >
                          <IoSettingsSharp size={22} /> My Settings
                        </Link>
                      </li>
                      <li>
                        <button
                          data-modal-target="popup-modal"
                          data-modal-toggle="popup-modal"
                          className="flex items-center gap-1.5 w-full text-left cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                          role="menuitem"
                          onClick={() => {
                            setModal(!modal);
                            setAdmin(!admin);
                          }}
                        >
                          <GiExitDoor size={24} /> Sign Up
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <aside
        id="logo-sidebar"
        className="fixed top-[57px] left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <li>
              <Link
                to="/"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <TbCategoryFilled size={22} />
                <span className="flex-1 ms-3 whitespace-nowrap">
                  Categories
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="brands"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <IoIosBookmarks size={23} />
                <span className="flex-1 ms-3 whitespace-nowrap">Brands</span>
              </Link>
            </li>
            <li>
              <Link
                to="models"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <SiThemodelsresource size={22} />
                <span className="flex-1 ms-3 whitespace-nowrap">Models</span>
              </Link>
            </li>
            <li>
              <Link
                to="locations"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <IoLocationSharp size={20} />
                <span className="flex-1 ms-3 whitespace-nowrap">Locations</span>
              </Link>
            </li>
            <li>
              <Link
                to="cities"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <FaCity size={22} />
                <span className="flex-1 ms-3 whitespace-nowrap">Cities</span>
              </Link>
            </li>
            <li>
              <Link
                to="cars"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <IoCarSportSharp size={24} />
                <span className="flex-1 ms-3 whitespace-nowrap">Cars</span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>

      <div className="p-4 sm:ml-64">
        <Outlet />
      </div>

      {/* SignUp modal */}
      {modal && (
        <div className=" overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
          <div className="relative mx-auto top-[20%] p-4 w-full max-w-md max-h-full">
            <div className="relative mx-auto top-[20%] bg-white rounded-lg shadow-sm dark:bg-gray-700">
              <button
                type="button"
                className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="popup-modal"
                onClick={() => setModal(false)}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div className="p-4 md:p-5 text-center">
                <svg
                  className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                  Are you sure you want to delete this product?
                </h3>
                <button
                  onClick={handleSignUp}
                  data-modal-hide="popup-modal"
                  type="button"
                  className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                >
                  Yes, I'm sure
                </button>
                <button
                  data-modal-hide="popup-modal"
                  type="button"
                  onClick={() => setModal(false)}
                  className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                >
                  No, cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
