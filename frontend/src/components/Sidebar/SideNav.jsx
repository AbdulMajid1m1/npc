import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineDashboard } from "react-icons/ai";
import { FaChevronDown, FaChevronUp, FaUsers } from "react-icons/fa";
import Images from "../../Images/gs1logowhite.png";
import { useNavigate } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import identify from "../../Images/identify.png";
import ngln from "../../Images/ngln.png";
import nsscc from "../../Images/nsscc.png";
import usersicon from "../../Images/usersicon.png";
import DashboardHeader from "../DashboardRightHeader/DashboardHeader";
import MasterData from "../../Images/master data.png";
import language from "../../Images/language.png";
import roleimg from "../../Images/roleicon.png"
import unitsimg from "../../Images/Unit.png";
import Documentsimage from "../../Images/documenticon.png";
import ProductPackagingimage from "../../Images/productpackaging.png";
import otherProductimage from "../../Images/otherproducts.png";
import gcptype from "../../Images/gcptype.png";
import countryofsale from "../../Images/countryofsale.png";
import hscode from "../../Images/hscode.png";
import unspcs from "../../Images/unspcs.png";
import cities from "../../Images/cities.png";
import state from "../../Images/state.png";
import country from "../../Images/country.png";
import Crnumber from "../../Images/Crnumber.png";
import documentIcon from "../../Images/document.png";
import newslettericon from "../../Images/newslettericon.png";

import { useTranslation } from "react-i18next";

function SideNav({ children }) {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isMangeOpen, setIsMangeOpen] = useState(false);
  const [MasterDatadropdown, setMasterDatadropdown] = useState(false);
  const [isMangeSliderOpen, setIsMangeSliderOpen] = useState(false);

  const navigate = useNavigate();

  const toggleSideNav = () => {
    setIsOpen(!isOpen);
  };

  const handleToggleMange = () => {
    setIsMangeOpen(!isMangeOpen);
  };
  const handleToggleMangemasterdata = () => {
    setMasterDatadropdown(!MasterDatadropdown);
  };
  const handleToggleMangeSlider = () => {
    setIsMangeSliderOpen(!isMangeSliderOpen);
  };

  return (
    <>
      <DashboardHeader />
      <div className="bg-dashboard-color p-3 ">
        {" "}
        {/* lg:h-screen */}
        <div className="body-content" x-data="{ open: true }">
          <div className="relative lg:block navbar-menu">
            <nav
              className={`fixed top-0 transition-all bg-dashboard-color lg:mt-0 mt-16  bottom-0 flex flex-col shadow bg-primary-sidebar overflow-hidden z-50 ${
                isOpen ? "w-[280px]" : "w-0"
              } ${i18n.language === "ar" ? "right-0" : "left-0"}`}
              id="sidenav"
            >
              <div className="flex items-center w-full px-4 pt-4 pb-4 border-b border-gray-300 ">
                <Link to="/dashboard">
                  <img src={Images} alt="logo" className="object-contain " />
                </Link>
              </div>
              <div className="pb-6 mt-4 overflow-x-hidden overflow-y-auto">
                <ul className="mb-8 text-sm ">
                  <li>
                    <Link
                      to="/dashboard"
                      className={`flex items-center px-6 py-4 text-gray-700 group hover:text-gray-600 hover:bg-gray-100 ${
                        i18n.language === "ar" ? "flex-row-reverse" : "flex-row"
                      }`}
                    >
                      <span
                        className={`drop-shadow-lg flex h-8 w-8 items-center justify-center rounded-lg bg-D2D180 bg-center text-center xl:p-2.5 ${
                          i18n.language === "ar" ? "ml-2" : "mr-2 "
                        }`}
                      >
                        <AiOutlineDashboard className="w-5 h-5" />
                      </span>
                      <span className="font-semibold">{t("Dashboard")}</span>
                    </Link>
                  </li>

                  <li>
                    <div
                      className={`flex items-start px-6 py-2 text-gray-700 group hover:text-gray-600 hover:bg-gray-100 cursor-pointer ${
                        i18n.language === "ar" ? "flex-row-reverse" : "flex-row"
                      }`}
                      onClick={handleToggleMange}
                    >
                      <span
                        className={`drop-shadow-lg flex h-10 w-10 items-center justify-center rounded-lg bg-white bg-center text-center xl:p-2.5 ${
                          i18n.language === "ar" ? "ml-2" : "mr-2 "
                        }`}
                      >
                        <img
                          src={identify}
                          alt="logo"
                          className="w-10 h-10 object-cover"
                        />
                      </span>
                      <span className="font-sans font-semibold  my-auto">
                        {t("IDENTIFY")}
                      </span>
                      <span
                        className={`inline-block  my-auto sidenav-arrow ${
                          i18n.language === "ar" ? "mr-auto" : "ml-auto"
                        }`}
                      >
                        {isMangeOpen ? <FaChevronUp /> : <FaChevronDown />}
                      </span>
                    </div>
                    {isMangeOpen && (
                      <div
                        className={`transition border-gray-500 dropdown-section nested-menu ${
                          i18n.language === "ar" ? "pr-3 mr-3 " : "pl-3 ml-3 "
                        }`}
                      >
                        <ul className="text-sm">
                          <li>
                            <Link
                              to="/gtin"
                              className={`flex items-center py-1  text-gray-700 rounded hover:bg-gray-100 ${
                                i18n.language === "ar"
                                  ? "pr-3 pl-4 justify-end"
                                  : "pl-3 pr-4 justify-start"
                              }`}
                            >
                              <div
                                className={`flex justify-center items-center gap-3 ${
                                  i18n.language === "ar"
                                    ? "flex-row-reverse"
                                    : "flex-row"
                                }`}
                              >
                                <img
                                  src={identify}
                                  alt="logo"
                                  className="w-10 h-10 object-cover"
                                />
                                <span
                                  className={`text-secondary font-semibold text-xl ${
                                    i18n.language === "ar"
                                      ? "text-end"
                                      : "text-start"
                                  }`}
                                >
                                  {t("GTIN")}
                                </span>
                              </div>
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/gtin"
                              className={`flex items-center py-1  text-gray-700 rounded hover:bg-gray-100 ${
                                i18n.language === "ar"
                                  ? "pr-3 pl-4 justify-end"
                                  : "pl-3 pr-4 justify-start"
                              }`}
                            >
                              <div
                                className={`flex justify-center items-center gap-3 ${
                                  i18n.language === "ar"
                                    ? "flex-row-reverse"
                                    : "flex-row"
                                }`}
                              >
                                <img
                                  src={ngln}
                                  alt="logo"
                                  className="w-10 h-10 object-cover rounded-full bg-white"
                                />
                                <span
                                  className={`text-secondary font-semibold text-xl ${
                                    i18n.language === "ar"
                                      ? "text-end"
                                      : "text-start"
                                  }`}
                                >
                                  {t("GLN")}
                                </span>
                              </div>
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/gtin"
                              className={`flex items-center py-1  text-gray-700 rounded hover:bg-gray-100 ${
                                i18n.language === "ar"
                                  ? "pr-3 pl-4 justify-end"
                                  : "pl-3 pr-4 justify-start"
                              }`}
                            >
                              <div
                                className={`flex justify-center items-center gap-3 ${
                                  i18n.language === "ar"
                                    ? "flex-row-reverse"
                                    : "flex-row"
                                }`}
                              >
                                <img
                                  src={nsscc}
                                  alt="logo"
                                  className="w-10 h-10 object-cover rounded-full bg-white"
                                />
                                <span
                                  className={`text-secondary font-semibold text-xl ${
                                    i18n.language === "ar"
                                      ? "text-end"
                                      : "text-start"
                                  }`}
                                >
                                  {t("SSCC")}
                                </span>
                              </div>
                            </Link>
                          </li>
                        </ul>
                      </div>
                    )}
                  </li>

                  <li>
                    <div
                      className={`flex items-start px-6 py-2 text-gray-700 group hover:text-gray-600 hover:bg-gray-100 cursor-pointer ${
                        i18n.language === "ar" ? "flex-row-reverse" : "flex-row"
                      }`}
                      onClick={handleToggleMangemasterdata}
                    >
                      <span
                        className={`drop-shadow-lg mr-2 flex h-10 w-10 items-center justify-center rounded-lg bg-white bg-center text-center  ${
                          i18n.language === "ar" ? "ml-2" : "mr-2"
                        }`}
                      >
                        <img
                          src={MasterData}
                          alt="logo"
                          className="w-10 h-10 object-cover"
                        />
                      </span>
                      <span className="font-sans font-semibold my-auto">
                        {t("Master Data")}
                      </span>
                      <span
                        className={`inline-block  my-auto sidenav-arrow ${
                          i18n.language === "ar" ? "mr-auto" : "ml-auto"
                        }`}
                      >
                        {MasterDatadropdown ? (
                          <FaChevronUp />
                        ) : (
                          <FaChevronDown />
                        )}
                      </span>
                    </div>
                    {MasterDatadropdown && (
                      <div
                        className={`transition border-gray-500 dropdown-section nested-menu ${
                          i18n.language === "ar" ? "pr-3 mr-3 " : "pl-3 ml-3 "
                        }`}
                      >
                        <ul className={`text-sm`}>
                          <li>
                            <Link
                              to="/Language/Dynamic"
                              className={`flex items-center py-1  text-gray-700 rounded hover:bg-gray-100 ${
                                i18n.language === "ar"
                                  ? "pr-3 pl-4 justify-end"
                                  : "pl-3 pr-4 justify-start"
                              }`}
                            >
                              <div
                                className={`flex justify-center items-center gap-3 ${
                                  i18n.language === "ar"
                                    ? "flex-row-reverse"
                                    : "flex-row"
                                }`}
                              >
                                <img
                                  src={language}
                                  alt="logo"
                                  className="w-10 h-10 object-cover"
                                />
                                <span className="text-secondary font-semibold text-xl">
                                  {t("Language")}
                                </span>
                              </div>
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/Users"
                              className={`flex items-center py-1  text-gray-700 rounded hover:bg-gray-100 ${
                                i18n.language === "ar"
                                  ? "pr-3 pl-4 justify-end"
                                  : "pl-3 pr-4 justify-start"
                              }`}
                            >
                              <div
                                className={`flex justify-center items-center gap-3 ${
                                  i18n.language === "ar"
                                    ? "flex-row-reverse"
                                    : "flex-row"
                                }`}
                              >
                                <img
                                  src={usersicon}
                                  alt="logo"
                                  className="w-10 h-10 object-cover rounded-full bg-white"
                                />
                                <span className="text-secondary font-semibold text-xl">
                                  {t("Users")}
                                </span>
                              </div>
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/Role"
                              className={`flex items-center py-1  text-gray-700 rounded hover:bg-gray-100 ${
                                i18n.language === "ar"
                                  ? "pr-3 pl-4 justify-end"
                                  : "pl-3 pr-4 justify-start"
                              }`}
                            >
                              <div
                                className={`flex justify-center items-center gap-3 ${
                                  i18n.language === "ar"
                                    ? "flex-row-reverse"
                                    : "flex-row"
                                }`}
                              >
                                <img
                                  src={roleimg}
                                  alt="logo"
                                  className="w-10 h-10 object-cover rounded-full bg-white"
                                />
                                <span className="text-secondary font-semibold text-xl">
                                  {t("Role")}
                                </span>
                              </div>
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/units"
                              className={`flex items-center py-1  text-gray-700 rounded hover:bg-gray-100 ${
                                i18n.language === "ar"
                                  ? "pr-3 pl-4 justify-end"
                                  : "pl-3 pr-4 justify-start"
                              }`}
                            >
                              <div
                                className={`flex justify-center items-center gap-3 ${
                                  i18n.language === "ar"
                                    ? "flex-row-reverse"
                                    : "flex-row"
                                }`}
                              >
                                <img
                                  src={unitsimg}
                                  alt="logo"
                                  className="w-10 h-10 object-cover rounded-full bg-white"
                                />
                                <span className="text-secondary font-semibold text-xl">
                                  {t("Units")}
                                </span>
                              </div>
                            </Link>
                          </li>

                          <li>
                            <Link
                              to="/Documents"
                              className={`flex items-center py-1  text-gray-700 rounded hover:bg-gray-100 ${
                                i18n.language === "ar"
                                  ? "pr-3 pl-4 justify-end"
                                  : "pl-3 pr-4 justify-start"
                              }`}
                            >
                              <div
                                className={`flex justify-center items-center gap-3 ${
                                  i18n.language === "ar"
                                    ? "flex-row-reverse"
                                    : "flex-row"
                                }`}
                              >
                                <img
                                  src={Documentsimage}
                                  alt="logo"
                                  className="w-10 h-10 object-cover rounded-full bg-white"
                                />
                                <span className="text-secondary font-semibold text-xl">
                                  {t("Documents")}
                                </span>
                              </div>
                            </Link>
                          </li>

                          <li>
                            <Link
                              to="/ProductPackaging"
                              className={`flex items-center py-1  text-gray-700 rounded hover:bg-gray-100 ${
                                i18n.language === "ar"
                                  ? "pr-3 pl-4 justify-end"
                                  : "pl-3 pr-4 justify-start"
                              }`}
                            >
                              <div
                                className={`flex justify-center items-center gap-3 ${
                                  i18n.language === "ar"
                                    ? "flex-row-reverse"
                                    : "flex-row"
                                }`}
                              >
                                <img
                                  src={ProductPackagingimage}
                                  alt="logo"
                                  className="w-10 h-10 object-cover rounded-full bg-white"
                                />
                                <span className="text-secondary font-semibold text-xl">
                                  {t("Product Packaging")}
                                </span>
                              </div>
                            </Link>
                          </li>

                          <li>
                            <Link
                              to="/Other_products"
                              className={`flex items-center py-1  text-gray-700 rounded hover:bg-gray-100 ${
                                i18n.language === "ar"
                                  ? "pr-3 pl-4 justify-end"
                                  : "pl-3 pr-4 justify-start"
                              }`}
                            >
                              <div
                                className={`flex justify-center items-center gap-3 ${
                                  i18n.language === "ar"
                                    ? "flex-row-reverse"
                                    : "flex-row"
                                }`}
                              >
                                <img
                                  src={otherProductimage}
                                  alt="logo"
                                  className="w-10 h-10 object-cover rounded-full bg-white"
                                />
                                <span className="text-secondary font-semibold text-xl">
                                  {t("Other Products")}
                                </span>
                              </div>
                            </Link>
                          </li>

                          <li>
                            <Link
                              to="/Gcp_type"
                              className={`flex items-center py-1  text-gray-700 rounded hover:bg-gray-100 ${
                                i18n.language === "ar"
                                  ? "pr-3 pl-4 justify-end"
                                  : "pl-3 pr-4 justify-start"
                              }`}
                            >
                              <div
                                className={`flex justify-center items-center gap-3 ${
                                  i18n.language === "ar"
                                    ? "flex-row-reverse"
                                    : "flex-row"
                                }`}
                              >
                                <img
                                  src={gcptype}
                                  alt="logo"
                                  className="w-10 h-10 object-cover rounded-full bg-white"
                                />
                                <span className="text-secondary font-semibold text-xl">
                                  {t("Gcp Type")}
                                </span>
                              </div>
                            </Link>
                          </li>

                          <li>
                            <Link
                              to="/CountryofSales"
                              className={`flex items-center py-1  text-gray-700 rounded hover:bg-gray-100 ${
                                i18n.language === "ar"
                                  ? "pr-3 pl-4 justify-end"
                                  : "pl-3 pr-4 justify-start"
                              }`}
                            >
                              <div
                                className={`flex justify-center items-center gap-3 ${
                                  i18n.language === "ar"
                                    ? "flex-row-reverse"
                                    : "flex-row"
                                }`}
                              >
                                <img
                                  src={countryofsale}
                                  alt="logo"
                                  className="w-10 h-10 object-cover rounded-full bg-white"
                                />
                                <span className="text-secondary font-semibold text-xl">
                                  {t("Country Of Sales")}
                                </span>
                              </div>
                            </Link>
                          </li>

                          <li>
                            <Link
                              to="/Hscode"
                              className={`flex items-center py-1  text-gray-700 rounded hover:bg-gray-100 ${
                                i18n.language === "ar"
                                  ? "pr-3 pl-4 justify-end"
                                  : "pl-3 pr-4 justify-start"
                              }`}
                            >
                              <div
                                className={`flex justify-center items-center gap-3 ${
                                  i18n.language === "ar"
                                    ? "flex-row-reverse"
                                    : "flex-row"
                                }`}
                              >
                                <img
                                  src={hscode}
                                  alt="logo"
                                  className="w-10 h-10 object-cover rounded-full bg-white"
                                />
                                <span className="text-secondary font-semibold text-xl">
                                  {t("Hs Code")}
                                </span>
                              </div>
                            </Link>
                          </li>

                          <li>
                            <Link
                              to="/UNSPCS"
                              className={`flex items-center py-1  text-gray-700 rounded hover:bg-gray-100 ${
                                i18n.language === "ar"
                                  ? "pr-3 pl-4 justify-end"
                                  : "pl-3 pr-4 justify-start"
                              }`}
                            >
                              <div
                                className={`flex justify-center items-center gap-3 ${
                                  i18n.language === "ar"
                                    ? "flex-row-reverse"
                                    : "flex-row"
                                }`}
                              >
                                <img
                                  src={unspcs}
                                  alt="logo"
                                  className="w-10 h-10 object-cover rounded-full bg-white"
                                />
                                <span className="text-secondary font-semibold text-xl">
                                  {t("UNSPCS")}
                                </span>
                              </div>
                            </Link>
                          </li>

                          <li>
                            <Link
                              to="/Cities"
                              className={`flex items-center py-1  text-gray-700 rounded hover:bg-gray-100 ${
                                i18n.language === "ar"
                                  ? "pr-3 pl-4 justify-end"
                                  : "pl-3 pr-4 justify-start"
                              }`}
                            >
                              <div
                                className={`flex justify-center items-center gap-3 ${
                                  i18n.language === "ar"
                                    ? "flex-row-reverse"
                                    : "flex-row"
                                }`}
                              >
                                <img
                                  src={cities}
                                  alt="logo"
                                  className="w-10 h-10 object-cover rounded-full bg-white"
                                />
                                <span className="text-secondary font-semibold text-xl">
                                  {t("Cities")}
                                </span>
                              </div>
                            </Link>
                          </li>

                          <li>
                            <Link
                              to="/State"
                              className={`flex items-center py-1  text-gray-700 rounded hover:bg-gray-100 ${
                                i18n.language === "ar"
                                  ? "pr-3 pl-4 justify-end"
                                  : "pl-3 pr-4 justify-start"
                              }`}
                            >
                              <div
                                className={`flex justify-center items-center gap-3 ${
                                  i18n.language === "ar"
                                    ? "flex-row-reverse"
                                    : "flex-row"
                                }`}
                              >
                                <img
                                  src={state}
                                  alt="logo"
                                  className="w-10 h-10 object-cover rounded-full bg-white"
                                />
                                <span className="text-secondary font-semibold text-xl">
                                  {t("State")}
                                </span>
                              </div>
                            </Link>
                          </li>

                          <li>
                            <Link
                              to="/Country"
                              className={`flex items-center py-1  text-gray-700 rounded hover:bg-gray-100 ${
                                i18n.language === "ar"
                                  ? "pr-3 pl-4 justify-end"
                                  : "pl-3 pr-4 justify-start"
                              }`}
                            >
                              <div
                                className={`flex justify-center items-center gap-3 ${
                                  i18n.language === "ar"
                                    ? "flex-row-reverse"
                                    : "flex-row"
                                }`}
                              >
                                <img
                                  src={country}
                                  alt="logo"
                                  className="w-10 h-10 object-cover rounded-full bg-white"
                                />
                                <span className="text-secondary font-semibold text-xl">
                                  {t("Country")}
                                </span>
                              </div>
                            </Link>
                          </li>

                          <li>
                            <Link
                              to="/crnumber"
                              className={`flex items-center py-1  text-gray-700 rounded hover:bg-gray-100 ${
                                i18n.language === "ar"
                                  ? "pr-3 pl-4 justify-end"
                                  : "pl-3 pr-4 justify-start"
                              }`}
                            >
                              <div
                                className={`flex justify-center items-center gap-3 ${
                                  i18n.language === "ar"
                                    ? "flex-row-reverse"
                                    : "flex-row"
                                }`}
                              >
                                <img
                                  src={Crnumber}
                                  alt="logo"
                                  className="w-10 h-10 object-cover rounded-full bg-white"
                                />
                                <span className="text-secondary font-semibold text-xl">
                                  {t("Cr Number")}
                                </span>
                              </div>
                            </Link>
                          </li>

                          <li>
                            <Link
                              to="/documenttype"
                              className={`flex items-center py-1  text-gray-700 rounded hover:bg-gray-100 ${
                                i18n.language === "ar"
                                  ? "pr-3 pl-4 justify-end"
                                  : "pl-3 pr-4 justify-start"
                              }`}
                            >
                              <div
                                className={`flex justify-center items-center gap-3 ${
                                  i18n.language === "ar"
                                    ? "flex-row-reverse"
                                    : "flex-row"
                                }`}
                              >
                                <img
                                  src={documentIcon}
                                  alt="logo"
                                  className="w-10 h-10 object-cover rounded-full bg-white"
                                />
                                <span className="text-secondary font-semibold text-xl">
                                  {t("Document Type")}
                                </span>
                              </div>
                            </Link>
                          </li>

                          <li>
                            <Link
                              to="/news-letter"
                              className={`flex items-center py-1  text-gray-700 rounded hover:bg-gray-100 ${
                                i18n.language === "ar"
                                  ? "pr-3 pl-4 justify-end"
                                  : "pl-3 pr-4 justify-start"
                              }`}
                            >
                              <div
                                className={`flex justify-center items-center gap-3 ${
                                  i18n.language === "ar"
                                    ? "flex-row-reverse"
                                    : "flex-row"
                                }`}
                              >
                                <img
                                  src={newslettericon}
                                  alt="logo"
                                  className="w-10 h-10 object-cover rounded-full bg-white"
                                />
                                <span className="text-secondary font-semibold text-xl">
                                  {t("NewsLetter")}
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
                      // className="flex items-center px-6 py-4 text-gray-700 group hover:text-gray-600 hover:bg-gray-100"
                      className={`flex items-center px-6 py-4 text-gray-700 group hover:text-gray-600 hover:bg-gray-100 ${
                        i18n.language === "ar" ? "flex-row-reverse" : "flex-row"
                      }`}
                    >
                      <span
                        className={`drop-shadow-lg flex h-8 w-8 items-center justify-center rounded-lg bg-D2D180 bg-center text-center xl:p-2.5 ${
                          i18n.language === "ar" ? "ml-2" : "mr-2 "
                        }`}
                      >
                        <AiOutlineDashboard className="w-5 h-5" />
                      </span>
                      <span className="font-semibold">{t("Log-out")}</span>
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
            isOpen
              ? `${i18n.language === "ar" ? "lg:mr-[280px]" : "lg:ml-[280px]"}`
              : "lg:ml-0"
          }`}
          id="dash"
        >
          <section className="sticky top-0 z-20 px-3 py-0 bg-[#1F0567] shadow text-gray-100 lg:px-5">
            <nav className="relative">
              <div
                className={`flex items-center ${
                  i18n.language === "ar" ? "justify-end" : "justify-start"
                }`}
              >
                <button onClick={toggleSideNav} className="px-2 py-3 ">
                  <RxHamburgerMenu className="text-white h-auto w-6" />
                </button>
                <p className="text-white font-sans">{t("Start")}</p>
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
