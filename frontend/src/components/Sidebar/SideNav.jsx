import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineDashboard } from "react-icons/ai";
import { FaChevronDown, FaChevronUp, FaUsers } from "react-icons/fa";
import Images from "../../Images/gs1logowhite.png"
import { useNavigate } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import identify from "../../Images/identify.png";
import ngln from "../../Images/ngln.png";
import nsscc from "../../Images/nsscc.png";
import DashboardHeader from "../DashboardRightHeader/DashboardHeader";

function SideNav({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMangeOpen, setIsMangeOpen] = useState(false);
  const [isMangeSliderOpen, setIsMangeSliderOpen] = useState(false);

  const navigate = useNavigate();

  const toggleSideNav = () => {
    setIsOpen(!isOpen);
  };

  
  const handleToggleMange = () => {
    setIsMangeOpen(!isMangeOpen);
  };
  const handleToggleMangeSlider = () => {
    setIsMangeSliderOpen(!isMangeSliderOpen);
  };

  return (
    <>
      <DashboardHeader />
      <div className="bg-dashboard-color p-3 lg:h-screen">
        <div className="body-content" x-data="{ open: true }">
          <div className="relative lg:block navbar-menu">
            <nav
              className={`fixed top-0 transition-all bg-dashboard-color lg:mt-0 mt-16 left-0 bottom-0 flex flex-col shadow bg-primary-sidebar overflow-hidden z-50 ${
                isOpen ? "w-[280px]" : "w-0"
              }`}
              id="sidenav"
            >
              <div className="flex items-center w-full px-4 pt-4 pb-4 border-b border-gray-300 ">
                <Link to="/dashboard">
                  <img
                    src={Images}
                    alt="logo"
                    className="object-contain "
                  />
                </Link>
              </div>
              <div className="pb-6 mt-4 overflow-x-hidden overflow-y-auto">
                <ul className="mb-8 text-sm ">
                  <li>
                    <Link
                      to="/dashboard"
                      className="flex items-center px-6 py-4 text-gray-700 group hover:text-gray-600 hover:bg-gray-100"
                    >
                      <span
                        className="drop-shadow-lg mr-2 flex h-8 w-8 items-center 
                                                            justify-center rounded-lg bg-D2D180 bg-center 
                                                             text-center xl:p-2.5"
                      >
                        <AiOutlineDashboard className="w-5 h-5" />
                      </span>
                      <span className="font-semibold">Dashboard</span>
                    </Link>
                  </li>
                  <li>
                    <div
                      className="flex items-center px-6 py-2 text-gray-700 group hover:text-gray-600 hover:bg-gray-100 cursor-pointer"
                      onClick={handleToggleMange}
                    >
                      <span
                        className="drop-shadow-lg mr-2 flex h-10 w-10 items-center 
                    justify-center rounded-lg bg-white bg-center 
                    text-center"
                      >
                        <img
                          src={identify}
                          alt="logo"
                          className="w-10 h-10 object-cover"
                        />
                      </span>
                      <span className="font-sans font-semibold">IDENTIFY</span>
                      <span className="inline-block ml-auto sidenav-arrow">
                        {isMangeOpen ? <FaChevronUp /> : <FaChevronDown />}
                      </span>
                    </div>
                    {isMangeOpen && (
                      <div className="pl-3 ml-3 transition border-gray-500 dropdown-section nested-menu">
                        <ul className="text-sm">
                          <li>
                            <Link
                              to="/gtin"
                              className="flex items-center py-1 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100"
                            >
                              <div className="flex justify-center items-center gap-3">
                                <img
                                    src={identify}
                                    alt="logo"
                                    className="w-10 h-10 object-cover"
                                    />
                                <span className="text-secondary font-semibold text-xl">
                                    GTIN
                                </span>
                                </div>
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/gtin"
                              className="flex items-center py-1 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100"
                            >
                              <div className="flex justify-center items-center gap-3">
                                <img
                                    src={ngln}
                                    alt="logo"
                                    className="w-10 h-10 object-cover rounded-full bg-white"
                                    />
                                <span className="text-secondary font-semibold text-xl">
                                    GLN
                                </span>
                                </div>
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/gtin"
                              className="flex items-center py-1 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100"
                            >
                              <div className="flex justify-center items-center gap-3">
                                <img
                                    src={nsscc}
                                    alt="logo"
                                    className="w-10 h-10 object-cover rounded-full bg-white"
                                    />
                                <span className="text-secondary font-semibold text-xl">
                                    SSCC
                                </span>
                                </div>
                            </Link>
                          </li>
                        </ul>
                      </div>
                    )}
                  </li>

                  <li>
                    <Link
                      to="/"
                      className="flex items-center px-6 py-4 text-gray-700 group hover:text-gray-600 hover:bg-gray-100"
                    >
                      <span
                        className="drop-shadow-lg mr-2 flex h-8 w-8 items-center 
                                                            justify-center rounded-lg bg-D2D180 bg-center 
                                                             text-center xl:p-2.5"
                      >
                        <AiOutlineDashboard className="w-5 h-5" />
                      </span>
                      <span className="font-semibold">Log-out</span>
                    </Link>
                  </li>

                </ul>
              </div>
            </nav>
          </div>
        </div>
        {/* top nav */}
        <div
          className={`mx-auto transition-all content-wrapper ${
            isOpen ? "lg:ml-[280px]" : "lg:ml-0"
          }`}
          id="dash"
        >
          <section className="sticky top-0 z-40 px-3 py-0 bg-[#1F0567] shadow text-gray-100 lg:px-5">
            <nav className="relative">
              <div className="flex justify-start items-center">
                  <button
                    onClick={toggleSideNav}
                    className="px-2 py-3 "
                  >
                    <RxHamburgerMenu className='text-white h-auto w-6'/>
                  </button>
                    <p className='text-white font-sans'>Start</p>
              </div>
            </nav>
          </section>

          {/* main content */}
          {children}
        </div>
      </div>
    </>
  );
}

export default SideNav;
