import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FaChevronDown, FaChevronUp, FaUsers } from "react-icons/fa";
import Images from "../../Images/gs1logowhite.png";
import { useNavigate } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import usersicon from "../../Images/usersicon.png";
import language from "../../Images/language.png";
import roleimg from "../../Images/roleicon.png";
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
import gs1v2logo from "../../Images/gs1logowhite.png";
import gtinmanagment from "../../Images/gtinmanagment.png";
import NPCcertification from "../../Images/NPCcertification.png";
import publisher from "../../Images/publisher.png";
import recipient from "../../Images/recipient.png";
import Userprofile from "../../Images/Userprofile.png";
import dashboradnpc from "../../Images/dashboradnpc.png";
import GLNmanagement from "../../Images/GLNmanagement.png";
import GS1digitallink from "../../Images/GS1digitallink.png";
import npcregistry from "../../Images/npcregistry.png";
import localproduct from "../../Images/localproduct.png";
import globalproduct from "../../Images/globalproduct.png";
import frontend from "../../Images/frontend.png";
import megamenu from "../../Images/megamenu.png";
import categories from "../../Images/categories.png";
import masterdatanpc from "../../Images/masterdatanpc.png";
import codifications from "../../Images/codifications.png";
import datamangement from "../../Images/datamangement.png";
import templatepages from "../../Images/pagestemplates/templatepages.png";
import template1 from "../../Images/pagestemplates/template1.png";
import template2 from "../../Images/pagestemplates/template2.png";
import template3 from "../../Images/pagestemplates/template3.png";
import template4 from "../../Images/pagestemplates/template4.png";
import template5 from "../../Images/pagestemplates/template5.png";
import template6 from "../../Images/pagestemplates/template6.png";
import template7 from "../../Images/pagestemplates/template7.png";
import gs1funtions from "../../Images/adminSidebar/gs1funtions.png";
import consumerrights from "../../Images/adminSidebar/consumerrights.png";
import digitalproductpassports from "../../Images/adminSidebar/digitalproductpassports.png";
import DQMS from "../../Images/adminSidebar/DQMS.png";
import governance from "../../Images/adminSidebar/governance.png";
import localdatapolicy from "../../Images/adminSidebar/localdatapolicy.png";
import subscribers from "../../Images/adminSidebar/subscribers.png";
import logout from "../../Images/logout.jpeg";
import { BiSearch } from "react-icons/bi";
import { FaListUl } from "react-icons/fa";
import { GiPriceTag } from "react-icons/gi";
import { SlCalender } from "react-icons/sl";
import { BiSpreadsheet } from "react-icons/bi";
import { CiBarcode } from "react-icons/ci";
import { IoMdSettings } from "react-icons/io";
import { MdOutlineLiveHelp } from "react-icons/md";
import { MdOutlineLogout } from "react-icons/md";
import { I18nextProvider, useTranslation } from "react-i18next";
import LanguageSwitcher from "../../switer";
import i18ns from "../../i18n";
import newRequest from "../../utils/userRequest";

function AdminSidebar({ isOpen, toggleSideNav }) {
  const { t, i18n } = useTranslation();
  // const [isOpen, setIsOpen] = useState(false);
  const [isMangeOpen, setIsMangeOpen] = useState(false);
  const [gs1FunctionDropdown, setGs1FunctionDropdown] = useState(false);
  const [MasterDatadropdown, setMasterDatadropdown] = useState(false);
  const [frontendDropdown, setFrontendDropdown] = useState(false);
  const [dataManagement, setDataManagement] = useState(false);
  const [complainceDropdown, setComplainDropdown] = useState(false);
  const [codificationDropdown, setCodificationDropdown] = useState(false);
  const [npcRegistry, setNpcRegistry] = useState(false);
  const [governanceDropdown, setGovernanceDropdown] = useState(false);
  const [isMangeSliderOpen, setIsMangeSliderOpen] = useState(false);

  const navigate = useNavigate();

  // const toggleSideNav = () => {
  //   setIsOpen(!isOpen);
  // };

  const handleToggleMange = () => {
    setIsMangeOpen(!isMangeOpen);
  };
  const handleToggleMangeGs1Function = () => {
    setGs1FunctionDropdown(!gs1FunctionDropdown);
  };
  const handleToggleDataManagement = () => {
    setDataManagement(!dataManagement);
  };
  const handleToggleMangemasterdata = () => {
    setMasterDatadropdown(!MasterDatadropdown);
  };
  const handleToggleMangeFrontendData = () => {
    setFrontendDropdown(!frontendDropdown);
  };
  const handleToggleMangeComplaince = () => {
    setComplainDropdown(!complainceDropdown);
  };
  const handleToggleMangeCodification = () => {
    setCodificationDropdown(!codificationDropdown);
  };
  const handleToggleMangeNpcRegistry = () => {
    setNpcRegistry(!npcRegistry);
  };
  const handleToogleManageGovernance = () => {
    setGovernanceDropdown(!governanceDropdown);
  };
  const handleToggleMangeSlider = () => {
    setIsMangeSliderOpen(!isMangeSliderOpen);
  };

  const [pagesTemplate, setPagesTemplate] = useState(false);
  const [templateData, setTemplateData] = useState([]);
  const fetchTemplateData = async () => {
    try {
      const response = await newRequest.get("/blogs/template");
      const data = response.data;
      // console.log(data)
      setTemplateData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const templatePathMap = {
    0: "/admin/template1",
    1: "/admin/template2",
    2: "/admin/template3",
    3: "/admin/template4",
    4: "/admin/template5",
    5: "/admin/template6",
    6: "/admin/template7",
  };

  const imageUrls = [
    template1,
    template2,
    template3,
    template4,
    template5,
    template6,
    template7,
  ];

  useEffect(() => {
    fetchTemplateData();
  }, []);

  return (
    <>
      {/* <DashboardHeader /> */}
      <div className="bg-dashboard-color p-3 ">
        {" "}
        {/* lg:h-screen */}
        <div className="body-content" x-data="{ open: true }">
          <div className="relative lg:block navbar-menu">
            <nav
              className={`fixed top-0 transition-all bg-dashboard-color lg:mt-0 mt-16  bottom-0 flex flex-col shadow bg-primary-sidebar overflow-hidden z-50 ${
                isOpen ? "w-[300px]" : "w-0"
              } ${i18n.language === "ar" ? "right-0" : "left-0"}`}
              id="sidenav"
            >
              <div className="flex justify-center items-center w-full px-4 pt-4 pb-0 border-b border-gray-300 ">
                <Link to="/admin/dashboard">
                  <img
                    src={Images}
                    alt="logo"
                    className="object-contain h-24"
                  />
                </Link>
              </div>
              <div className="pb-6 mt-4 overflow-x-hidden overflow-y-auto">
                <ul className="mb-8 text-sm ">
                  <li>
                    <div
                      className={`flex items-start px-6 py-2 text-gray-700 group hover:text-gray-600 hover:bg-gray-100 cursor-pointer ${
                        i18n.language === "ar" ? "flex-row-reverse" : "flex-row"
                      }`}
                      onClick={handleToggleMangeGs1Function}
                    >
                      <span
                        className={`drop-shadow-lg mr-2 flex h-10 w-10 items-center justify-center rounded-lg bg-center text-center  ${
                          i18n.language === "ar" ? "ml-2" : "mr-2"
                        }`}
                      >
                        <img
                          src={gs1funtions}
                          alt="logo"
                          className="w-10 h-10 object-cover"
                        />
                      </span>
                      <span className="text-secondary font-semibold text-base font-sans my-auto">
                        {t("GS1 Functions")}
                      </span>
                      <span
                        className={`inline-block  my-auto sidenav-arrow ${
                          i18n.language === "ar" ? "mr-auto" : "ml-auto"
                        }`}
                      >
                        {gs1FunctionDropdown ? (
                          <FaChevronUp />
                        ) : (
                          <FaChevronDown />
                        )}
                      </span>
                    </div>
                    {gs1FunctionDropdown && (
                      <div
                        className={`transition border-gray-500 dropdown-section nested-menu ${
                          i18n.language === "ar" ? "pr-3 mr-3" : "pl-3 ml-3"
                        }`}
                      >
                        <ul className={`text-sm flex flex-col gap-3`}>
                          <li>
                            <Link
                              to="/admin/dashboard"
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
                                  src={dashboradnpc}
                                  alt="logo"
                                  className="w-10 h-10 object-cover"
                                />
                                <span className="font-sans font-semibold text-base my-auto text-secondary">
                                  {t("Dashboard")}
                                </span>
                              </div>
                            </Link>
                          </li>
                          <li>
                            <div
                              className={`flex items-start px-3 py-1 text-gray-700 group hover:text-gray-600 hover:bg-gray-100 cursor-pointer ${
                                i18n.language === "ar"
                                  ? "flex-row-reverse"
                                  : "flex-row"
                              }`}
                              onClick={handleToggleDataManagement}
                            >
                              <span
                                className={`drop-shadow-lg mr-2 flex h-10 w-10 items-center justify-center rounded-lg bg-center text-center  ${
                                  i18n.language === "ar" ? "ml-2" : "mr-2"
                                }`}
                              >
                                <img
                                  src={subscribers}
                                  alt="logo"
                                  className="w-10 h-10 object-cover"
                                />
                              </span>
                              <span className="text-secondary font-semibold text-base font-sans my-auto">
                                {t("Subscribers")}
                              </span>
                              <span
                                className={`inline-block  my-auto sidenav-arrow ${
                                  i18n.language === "ar" ? "mr-auto" : "ml-auto"
                                }`}
                              >
                                {dataManagement ? (
                                  <FaChevronUp />
                                ) : (
                                  <FaChevronDown />
                                )}
                              </span>
                            </div>
                            {dataManagement && (
                              <div
                                className={`transition border-gray-500 dropdown-section nested-menu ${
                                  i18n.language === "ar" ? "pr-3 " : "pl-3"
                                }`}
                              >
                                <ul className="text-sm flex flex-col gap-3">
                                  <li>
                                    <Link
                                      to="/admin/gtin"
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
                                          src={gtinmanagment}
                                          alt="logo"
                                          className="w-10 h-10 object-cover"
                                        />
                                        <span
                                          className={`text-secondary font-semibold text-base font-sans ${
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
                                      to="/admin/gln"
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
                                          src={GLNmanagement}
                                          alt="logo"
                                          className="w-10 h-10 object-cover rounded-full bg-white"
                                        />
                                        <span
                                          className={`text-secondary font-semibold text-base font-sans ${
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
                                      to="/admin/gtin"
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
                                          src={GS1digitallink}
                                          alt="logo"
                                          className="w-10 h-10 object-cover rounded-full bg-white"
                                        />
                                        <span
                                          className={`text-secondary font-semibold text-base font-sans ${
                                            i18n.language === "ar"
                                              ? "text-end"
                                              : "text-start"
                                          }`}
                                        >
                                          {t("Digital Links")}
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
                              className={`flex items-start px-3 py-1 text-gray-700 group hover:text-gray-600 hover:bg-gray-100 cursor-pointer ${
                                i18n.language === "ar"
                                  ? "flex-row-reverse"
                                  : "flex-row"
                              }`}
                              onClick={handleToggleMangeFrontendData}
                            >
                              <span
                                className={`drop-shadow-lg mr-2 flex h-10 w-10 items-center justify-center rounded-lg bg-center text-center  ${
                                  i18n.language === "ar" ? "ml-2" : "mr-2"
                                }`}
                              >
                                <img
                                  src={frontend}
                                  alt="logo"
                                  className="w-10 h-10 object-cover"
                                />
                              </span>
                              <span className="text-secondary my-auto font-sans font-semibold text-base">
                                {t("Frontend")}
                              </span>
                              <span
                                className={`inline-block my-auto sidenav-arrow ${
                                  i18n.language === "ar" ? "mr-auto" : "ml-auto"
                                }`}
                              >
                                {frontendDropdown ? (
                                  <FaChevronUp />
                                ) : (
                                  <FaChevronDown />
                                )}
                              </span>
                            </div>
                            {frontendDropdown && (
                              <div
                                className={`transition border-gray-500 dropdown-section nested-menu ${
                                  i18n.language === "ar" ? "pr-3" : "pl-3"
                                }`}
                              >
                                <ul className={`text-sm flex flex-col gap-3`}>
                                  <li>
                                    <Link
                                      to="/admin/megamenu"
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
                                          src={megamenu}
                                          alt="logo"
                                          className="w-10 h-10 object-cover"
                                        />
                                        <span className="text-secondary font-semibold text-base font-sans">
                                          {t("Mega Menu")}
                                        </span>
                                      </div>
                                    </Link>
                                  </li>
                                  <li>
                                    <Link
                                      to="/admin/categories"
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
                                          src={categories}
                                          alt="logo"
                                          className="w-10 h-10 object-cover"
                                        />
                                        <span className="text-secondary font-semibold text-base font-sans">
                                          {t("Categories")}
                                        </span>
                                      </div>
                                    </Link>
                                  </li>
                                  <li>
                                    <Link
                                      to="/admin/sectors"
                                      className={`flex items-center py-2  text-gray-700 rounded hover:bg-gray-100 ${
                                        i18n.language === "ar"
                                          ? "pr-3 pl-3 justify-end"
                                          : "pl-3 pr-3 justify-start"
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
                                          src={Userprofile}
                                          alt="logo"
                                          className="w-10 h-10 object-cover rounded-full bg-white"
                                        />
                                        <span
                                          className={`text-secondary font-semibold text-base font-sans ${
                                            i18n.language === "ar"
                                              ? "text-end"
                                              : "text-start"
                                          }`}
                                        >
                                          {t("Sectors")}
                                        </span>
                                      </div>
                                    </Link>
                                  </li>
                                  <li>
                                    <Link
                                      to="/admin/solution-inovations"
                                      className={`flex items-center py-2  text-gray-700 rounded hover:bg-gray-100 ${
                                        i18n.language === "ar"
                                          ? "pr-3 pl-3 justify-end"
                                          : "pl-3 pr-3 justify-start"
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
                                          src={Userprofile}
                                          alt="logo"
                                          className="w-10 h-10 object-cover rounded-full bg-white"
                                        />
                                        <span
                                          className={`text-secondary font-semibold text-base font-sans ${
                                            i18n.language === "ar"
                                              ? "text-end"
                                              : "text-start"
                                          }`}
                                        >
                                          {t("Help Resources")}
                                        </span>
                                      </div>
                                    </Link>
                                  </li>

                                  <div
                                    className={`flex items-start px-3 py-2 text-gray-700 group hover:text-gray-600 hover:bg-gray-100 cursor-pointer ${
                                      i18n.language === "ar"
                                        ? "flex-row-reverse"
                                        : "flex-row"
                                    }`}
                                    onClick={() =>
                                      setPagesTemplate(!pagesTemplate)
                                    }
                                  >
                                    <span
                                      className={`drop-shadow-lg mr-2 flex h-10 w-10 items-center justify-center rounded-lg bg-center text-center  ${
                                        i18n.language === "ar" ? "ml-2" : "mr-2"
                                      }`}
                                    >
                                      <img
                                        src={frontend}
                                        alt="logo"
                                        className="w-10 h-10 object-cover"
                                      />
                                    </span>
                                    <span className="text-secondary my-auto font-sans text-base font-semibold">
                                      {t("Template Pages")}
                                    </span>
                                    <span
                                      className={`inline-block my-auto sidenav-arrow ${
                                        i18n.language === "ar"
                                          ? "mr-auto"
                                          : "ml-auto"
                                      }`}
                                    >
                                      {pagesTemplate ? (
                                        <FaChevronUp />
                                      ) : (
                                        <FaChevronDown />
                                      )}
                                    </span>
                                  </div>
                                  {pagesTemplate && (
                                    <div
                                      className={`transition border-gray-500 dropdown-section nested-menu space-y-2 ${
                                        i18n.language === "ar" ? "pr-3" : "pl-3"
                                      }`}
                                    >
                                      {templateData?.map((item, index) => {
                                        const path =
                                          templatePathMap[index] ||
                                          `/admin/template${index + 1}`;
                                        const imageUrl =
                                          imageUrls[index % imageUrls.length];
                                        return (
                                          <div key={index}>
                                            <ul
                                              className={`text-sm flex flex-col gap-3`}
                                            >
                                              <li>
                                                <Link
                                                  to={path}
                                                  className={`flex items-center py-1  text-gray-700 rounded hover:bg-gray-100 ${
                                                    i18n.language === "ar"
                                                      ? "pr-3 pl-4 justify-end"
                                                      : "pl-3 pr-4 justify-start"
                                                  }`}
                                                  onClick={() => {
                                                    sessionStorage.setItem(
                                                      "selectedTemplate",
                                                      JSON.stringify(item)
                                                    );
                                                  }}
                                                >
                                                  <div
                                                    className={`flex justify-center items-center gap-3 ${
                                                      i18n.language === "ar"
                                                        ? "flex-row-reverse"
                                                        : "flex-row"
                                                    }`}
                                                  >
                                                    <img
                                                      src={imageUrl}
                                                      alt="logo"
                                                      className="w-10 h-10 object-cover"
                                                    />
                                                    <span className="text-secondary font-semibold text-base font-sans">
                                                      {item?.name}
                                                    </span>
                                                  </div>
                                                </Link>
                                              </li>
                                            </ul>
                                          </div>
                                        );
                                      })}
                                    </div>
                                  )}
                                </ul>
                              </div>
                            )}
                          </li>
                          <li>
                            <div
                              className={`flex items-start px-3 py-1 text-gray-700 group hover:text-gray-600 hover:bg-gray-100 cursor-pointer ${
                                i18n.language === "ar"
                                  ? "flex-row-reverse"
                                  : "flex-row"
                              }`}
                              onClick={handleToggleMangemasterdata}
                            >
                              <span
                                className={`drop-shadow-lg mr-2 flex h-10 w-10 items-center justify-center rounded-lg bg-center text-center  ${
                                  i18n.language === "ar" ? "ml-2" : "mr-2"
                                }`}
                              >
                                <img
                                  src={masterdatanpc}
                                  alt="logo"
                                  className="w-10 h-10 object-cover"
                                />
                              </span>
                              <span className="font-sans text-secondary font-semibold my-auto">
                                {t("MASTER DATA")}
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
                                  i18n.language === "ar" ? "pr-3" : "pl-3"
                                }`}
                              >
                                <ul className={`text-sm flex flex-col gap-3`}>
                                  <li>
                                    <Link
                                      to="/admin/Language/Dynamic"
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
                                        <span className="font-sans text-secondary font-semibold text-base">
                                          {t("Language")}
                                        </span>
                                      </div>
                                    </Link>
                                  </li>
                                  <li>
                                    <Link
                                      to="/admin/Users"
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
                                        <span className="text-secondary font-semibold text-base font-sans">
                                          {t("Users")}
                                        </span>
                                      </div>
                                    </Link>
                                  </li>
                                  <li>
                                    <Link
                                      to="/admin/Role"
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
                                        <span className="text-secondary font-semibold text-base font-sans">
                                          {t("Role")}
                                        </span>
                                      </div>
                                    </Link>
                                  </li>
                                  <li>
                                    <Link
                                      to="/admin/units"
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
                                        <span className="text-secondary font-semibold text-base font-sans">
                                          {t("Units")}
                                        </span>
                                      </div>
                                    </Link>
                                  </li>

                                  <li>
                                    <Link
                                      to="/admin/Documents"
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
                                        <span className="text-secondary font-semibold text-base font-sans">
                                          {t("Documents")}
                                        </span>
                                      </div>
                                    </Link>
                                  </li>

                                  <li>
                                    <Link
                                      to="/admin/ProductPackaging"
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
                                        <span className="text-secondary font-semibold text-base font-sans">
                                          {t("Product Packaging")}
                                        </span>
                                      </div>
                                    </Link>
                                  </li>

                                  <li>
                                    <Link
                                      to="/admin/Other_products"
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
                                        <span className="text-secondary font-semibold text-base font-sans">
                                          {t("Other Products")}
                                        </span>
                                      </div>
                                    </Link>
                                  </li>

                                  <li>
                                    <Link
                                      to="/admin/Gcp_type"
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
                                        <span className="text-secondary font-semibold text-base font-sans">
                                          {t("Gcp Type")}
                                        </span>
                                      </div>
                                    </Link>
                                  </li>

                                  <li>
                                    <Link
                                      to="/admin/CountryofSales"
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
                                        <span className="text-secondary font-semibold text-base font-sans">
                                          {t("Country Of Sales")}
                                        </span>
                                      </div>
                                    </Link>
                                  </li>

                                  <li>
                                    <Link
                                      to="/admin/Hscode"
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
                                        <span className="text-secondary font-semibold text-base font-sans">
                                          {t("Hs Code")}
                                        </span>
                                      </div>
                                    </Link>
                                  </li>

                                  <li>
                                    <Link
                                      to="/admin/UNSPCS"
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
                                        <span className="text-secondary font-semibold text-base font-sans">
                                          {t("UNSPCS")}
                                        </span>
                                      </div>
                                    </Link>
                                  </li>

                                  <li>
                                    <Link
                                      to="/admin/Cities"
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
                                        <span className="text-secondary font-semibold text-base font-sans">
                                          {t("Cities")}
                                        </span>
                                      </div>
                                    </Link>
                                  </li>

                                  <li>
                                    <Link
                                      to="/admin/State"
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
                                        <span className="text-secondary font-semibold text-base font-sans">
                                          {t("State")}
                                        </span>
                                      </div>
                                    </Link>
                                  </li>

                                  <li>
                                    <Link
                                      to="/admin/Country"
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
                                        <span className="text-secondary font-semibold text-base font-sans">
                                          {t("Country")}
                                        </span>
                                      </div>
                                    </Link>
                                  </li>

                                  <li>
                                    <Link
                                      to="/admin/crnumber"
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
                                        <span className="text-secondary font-semibold text-base font-sans">
                                          {t("Cr Number")}
                                        </span>
                                      </div>
                                    </Link>
                                  </li>

                                  <li>
                                    <Link
                                      to="/admin/documenttype"
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
                                        <span className="text-secondary font-semibold text-base font-sans">
                                          {t("Document Type")}
                                        </span>
                                      </div>
                                    </Link>
                                  </li>

                                  <li>
                                    <Link
                                      to="/admin/news-letter"
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
                                        <span className="text-secondary font-semibold text-base font-sans">
                                          {t("News Letter")}
                                        </span>
                                      </div>
                                    </Link>
                                  </li>
                                </ul>
                              </div>
                            )}
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
                      onClick={handleToggleMangeNpcRegistry}
                    >
                      <span
                        className={`drop-shadow-lg mr-2 flex h-10 w-10 items-center justify-center rounded-lg bg-center text-center  ${
                          i18n.language === "ar" ? "ml-2" : "mr-2"
                        }`}
                      >
                        <img
                          src={DQMS}
                          alt="logo"
                          className="w-10 h-10 object-cover"
                        />
                      </span>
                      <span className="text-secondary font-semibold text-base font-sans my-auto">
                        {t("DQMS")}
                      </span>
                      <span
                        className={`inline-block  my-auto sidenav-arrow ${
                          i18n.language === "ar" ? "mr-auto" : "ml-auto"
                        }`}
                      >
                        {npcRegistry ? <FaChevronUp /> : <FaChevronDown />}
                      </span>
                    </div>
                    {npcRegistry && (
                      <div
                        className={`transition border-gray-500 dropdown-section nested-menu ${
                          i18n.language === "ar" ? "pr-3 mr-3 " : "pl-3 ml-3 "
                        }`}
                      >
                        <ul className={`text-sm flex flex-col gap-3`}>
                          <li>
                            <Link
                              to="/admin/dashboard"
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
                                  src={dashboradnpc}
                                  alt="logo"
                                  className="w-10 h-10 object-cover"
                                />
                                <span className="font-sans font-semibold text-base my-auto text-secondary">
                                  {t("Dashboard")}
                                </span>
                              </div>
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/admin/global-product-registry"
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
                                  src={globalproduct}
                                  alt="logo"
                                  className="w-10 h-10 object-cover"
                                />
                                <span className="text-secondary font-semibold text-base font-sans truncate">
                                  {t("Global Registry")}
                                </span>
                              </div>
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/admin/local-product-registry"
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
                                  src={localproduct}
                                  alt="logo"
                                  className="w-10 h-10 object-cover"
                                />
                                <span className="text-secondary font-semibold text-base font-sans truncate">
                                  {t("Local Registry")}
                                </span>
                              </div>
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/admin/gtin"
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
                                  src={gtinmanagment}
                                  alt="logo"
                                  className="w-10 h-10 object-cover"
                                />
                                <span
                                  className={`text-secondary font-semibold text-base font-sans ${
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
                              to="/admin/gln"
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
                                  src={GLNmanagement}
                                  alt="logo"
                                  className="w-10 h-10 object-cover rounded-full bg-white"
                                />
                                <span
                                  className={`text-secondary font-semibold text-base font-sans ${
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
                              to="/admin/gtin"
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
                                  src={GS1digitallink}
                                  alt="logo"
                                  className="w-10 h-10 object-cover rounded-full bg-white"
                                />
                                <span
                                  className={`text-secondary font-semibold text-base font-sans ${
                                    i18n.language === "ar"
                                      ? "text-end"
                                      : "text-start"
                                  }`}
                                >
                                  {t("Digital Links")}
                                </span>
                              </div>
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/admin/gln"
                              className={`flex items-center py-1  text-gray-700 rounded hover:bg-gray-100 ${
                                i18n.language === "ar"
                                  ? "pr-3 pl-3 justify-end"
                                  : "pl-3 pr-3 justify-start"
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
                                  src={Userprofile}
                                  alt="logo"
                                  className="w-10 h-10 object-cover rounded-full bg-white"
                                />
                                <span
                                  className={`text-secondary font-semibold text-base font-sans ${
                                    i18n.language === "ar"
                                      ? "text-end"
                                      : "text-start"
                                  }`}
                                >
                                  {t("API Guide")}
                                </span>
                              </div>
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/admin/frontend"
                              className={`flex items-center py-1  text-gray-700 rounded hover:bg-gray-100 ${
                                i18n.language === "ar"
                                  ? "pr-3 pl-3 justify-end"
                                  : "pl-3 pr-3 justify-start"
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
                                  src={frontend}
                                  alt="logo"
                                  className="w-10 h-10 object-cover rounded-full bg-white"
                                />
                                <span
                                  className={`text-secondary font-semibold text-base font-sans ${
                                    i18n.language === "ar"
                                      ? "text-end"
                                      : "text-start"
                                  }`}
                                >
                                  {t("Frontend")}
                                </span>
                              </div>
                            </Link>
                          </li>
                        </ul>
                      </div>
                    )}

                    <li>
                      <div
                        className={`flex items-start px-6 py-2 text-gray-700 group hover:text-gray-600 hover:bg-gray-100 cursor-pointer ${
                          i18n.language === "ar"
                            ? "flex-row-reverse"
                            : "flex-row"
                        }`}
                        onClick={handleToggleMangeComplaince}
                      >
                        <span
                          className={`drop-shadow-lg mr-2 flex h-10 w-10 items-center justify-center rounded-lg bg-center text-center  ${
                            i18n.language === "ar" ? "ml-2" : "mr-2"
                          }`}
                        >
                          <img
                            src={codifications}
                            alt="logo"
                            className="w-10 h-10 object-cover"
                          />
                        </span>
                        <span className="text-secondary font-semibold text-base font-sans my-auto">
                          {t("COMPLIANCE")}
                        </span>
                        <span
                          className={`inline-block  my-auto sidenav-arrow ${
                            i18n.language === "ar" ? "mr-auto" : "ml-auto"
                          }`}
                        >
                          {complainceDropdown ? (
                            <FaChevronUp />
                          ) : (
                            <FaChevronDown />
                          )}
                        </span>
                      </div>
                      {complainceDropdown && (
                        <div
                          className={`transition border-gray-500 dropdown-section nested-menu ${
                            i18n.language === "ar" ? "pr-3 mr-3 " : "pl-3 ml-3 "
                          }`}
                        >
                          <ul className={`text-sm flex flex-col gap-3`}>
                            <li>
                              <Link
                                // to="/admin/Language/Dynamic"
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
                                    src={dashboradnpc}
                                    alt="logo"
                                    className="w-10 h-10 object-cover"
                                  />
                                  <span className="text-secondary font-semibold text-base font-sans">
                                    {t("Dashboard")}
                                  </span>
                                </div>
                              </Link>
                            </li>
                            <li>
                              <Link
                                // to="/admin/Language/Dynamic"
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
                                    src={GLNmanagement}
                                    alt="logo"
                                    className="w-10 h-10 object-cover"
                                  />
                                  <span className="text-secondary font-semibold text-base font-sans">
                                    {t("Codifications")}
                                  </span>
                                </div>
                              </Link>
                            </li>
                            <li>
                              <Link
                                // to="/admin/Language/Dynamic"
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
                                    src={NPCcertification}
                                    alt="logo"
                                    className="w-10 h-10 object-cover"
                                  />
                                  <span className="text-secondary font-semibold text-base font-sans">
                                    {t("NPC Certifications")}
                                  </span>
                                </div>
                              </Link>
                            </li>
                            <li>
                              <Link
                                // to="/admin/Language/Dynamic"
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
                                    src={frontend}
                                    alt="logo"
                                    className="w-10 h-10 object-cover"
                                  />
                                  <span className="text-secondary font-semibold text-base font-sans">
                                    {t("Frontend")}
                                  </span>
                                </div>
                              </Link>
                            </li>
                          </ul>
                        </div>
                      )}
                    </li>
                  </li>
                  <li>
                    {/* <li>
                    <div
                      className={`flex items-start px-6 py-2 text-gray-700 group hover:text-gray-600 hover:bg-gray-100 cursor-pointer ${
                        i18n.language === "ar" ? "flex-row-reverse" : "flex-row"
                      }`}
                      onClick={handleToggleMangeCodification}
                    >
                      <span
                        className={`drop-shadow-lg mr-2 flex h-10 w-10 items-center justify-center rounded-lg bg-center text-center  ${
                          i18n.language === "ar" ? "ml-2" : "mr-2"
                        }`}
                      >
                        <img
                          src={codifications}
                          alt="logo"
                          className="w-10 h-10 object-cover"
                        />
                      </span>
                      <span className="text-secondary font-semibold text-base font-sans my-auto">
                        {t("Codification")}
                      </span>
                      <span
                        className={`inline-block  my-auto sidenav-arrow ${
                          i18n.language === "ar" ? "mr-auto" : "ml-auto"
                        }`}
                      >
                        {codificationDropdown ? (
                          <FaChevronUp />
                        ) : (
                          <FaChevronDown />
                        )}
                      </span>
                    </div>
                    {codificationDropdown && (
                      <div
                        className={`transition border-gray-500 dropdown-section nested-menu ${
                          i18n.language === "ar" ? "pr-3 mr-3 " : "pl-3 ml-3 "
                        }`}
                      >
                        <ul className={`text-sm flex flex-col gap-3`}>
                          <li>
                            <Link
                              // to="/admin/Language/Dynamic"
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
                                <span className="text-secondary font-semibold text-base font-sans">
                                  {t("GPC")}
                                </span>
                              </div>
                            </Link>
                          </li>
                          <li>
                            <Link
                              // to="/admin/Language/Dynamic"
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
                                  src={dashboradnpc}
                                  alt="logo"
                                  className="w-10 h-10 object-cover"
                                />
                                <span className="text-secondary font-semibold text-base font-sans">
                                  {t("HS-CODE")}
                                </span>
                              </div>
                            </Link>
                          </li>
                          <li>
                            <Link
                              // to="/admin/Language/Dynamic"
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
                                  src={GLNmanagement}
                                  alt="logo"
                                  className="w-10 h-10 object-cover"
                                />
                                <span className="text-secondary font-semibold text-base font-sans">
                                  {t("UNSPSC")}
                                </span>
                              </div>
                            </Link>
                          </li>
                          <li>
                            <Link
                              // to="/admin/Language/Dynamic"
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
                                  src={gtinmanagment}
                                  alt="logo"
                                  className="w-10 h-10 object-cover"
                                />
                                <span className="text-secondary font-semibold text-base font-sans">
                                  {t("GS1 GMN")}
                                </span>
                              </div>
                            </Link>
                          </li>
                          <li>
                            <Link
                              // to="/admin/Language/Dynamic"
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
                                  src={NPCcertification}
                                  alt="logo"
                                  className="w-10 h-10 object-cover"
                                />
                                <span className="text-secondary font-semibold text-base font-sans">
                                  {t("GMDN")}
                                </span>
                              </div>
                            </Link>
                          </li>
                          </ul>
                      </div>
                    )}
                  </li>  */}

                    {/* <li>
                            <Link
                              to="/admin/gln"
                              className={`flex items-center py-2  text-gray-700 rounded hover:bg-gray-100 ${
                                i18n.language === "ar"
                                  ? "pr-6 pl-6 justify-end"
                                  : "pl-6 pr-6 justify-start"
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
                                  src={publisher}
                                  alt="logo"
                                  className="w-10 h-10 object-cover rounded-full bg-white"
                                />
                                <span
                                  className={`text-secondary font-semibold text-base font-sans ${
                                    i18n.language === "ar"
                                      ? "text-end"
                                      : "text-start"
                                  }`}
                                >
                                  {t("Publisher")}
                                </span>
                              </div>
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/admin/gln"
                              className={`flex items-center py-2  text-gray-700 rounded hover:bg-gray-100 ${
                                i18n.language === "ar"
                                  ? "pr-6 pl-6 justify-end"
                                  : "pl-6 pr-6 justify-start"
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
                                  src={recipient}
                                  alt="logo"
                                  className="w-10 h-10 object-cover rounded-full bg-white"
                                />
                                <span
                                  className={`text-secondary font-semibold text-base font-sans ${
                                    i18n.language === "ar"
                                      ? "text-end"
                                      : "text-start"
                                  }`}
                                >
                                  {t("Recipient")}
                                </span>
                              </div>
                            </Link>
                          </li> */}
                  </li>
                  <li>
                    <div
                      className={`flex items-start px-6 py-2 text-gray-700 group hover:text-gray-600 hover:bg-gray-100 cursor-pointer ${
                        i18n.language === "ar" ? "flex-row-reverse" : "flex-row"
                      }`}
                      onClick={handleToogleManageGovernance}
                    >
                      <span
                        className={`drop-shadow-lg mr-2 flex h-10 w-10 items-center justify-center rounded-lg bg-center text-center  ${
                          i18n.language === "ar" ? "ml-2" : "mr-2"
                        }`}
                      >
                        <img
                          src={governance}
                          alt="logo"
                          className="w-10 h-10 object-cover"
                        />
                      </span>
                      <span className="text-secondary font-semibold text-base font-sans my-auto">
                        {t("GOVERNANCE")}
                      </span>
                      <span
                        className={`inline-block  my-auto sidenav-arrow ${
                          i18n.language === "ar" ? "mr-auto" : "ml-auto"
                        }`}
                      >
                        {governanceDropdown ? (
                          <FaChevronUp />
                        ) : (
                          <FaChevronDown />
                        )}
                      </span>
                    </div>
                    {governanceDropdown && (
                      <div
                        className={`transition border-gray-500 dropdown-section nested-menu ${
                          i18n.language === "ar" ? "pr-3 mr-3 " : "pl-3 ml-3 "
                        }`}
                      >
                        <ul className={`text-sm flex flex-col gap-3`}>
                          <li>
                            <Link
                              // to="/admin/Language/Dynamic"
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
                                  src={digitalproductpassports}
                                  alt="logo"
                                  className="w-10 h-10 object-cover"
                                />
                                <span className="text-secondary font-semibold text-base font-sans">
                                  {t("GS1 DPP")}
                                </span>
                              </div>
                            </Link>
                          </li>
                          <li>
                            <Link
                              // to="/admin/Language/Dynamic"
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
                                  src={localdatapolicy}
                                  alt="logo"
                                  className="w-10 h-10 object-cover"
                                />
                                <span className="text-secondary font-semibold text-base font-sans">
                                  {t("Local Data Policy")}
                                </span>
                              </div>
                            </Link>
                          </li>
                          <li>
                            <Link
                              // to="/admin/Language/Dynamic"
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
                                  src={consumerrights}
                                  alt="logo"
                                  className="w-10 h-10 object-cover"
                                />
                                <span className="text-secondary font-semibold text-base font-sans">
                                  {t("Consumer Rights")}
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
                      className={`flex items-center px-3 py-0 text-gray-700 group hover:text-gray-600 hover:bg-gray-100 ${
                        i18n.language === "ar" ? "flex-row-reverse" : "flex-row"
                      }`}
                    >
                      <span
                        className={`drop-shadow-lg flex h-16 w-16 items-center justify-center rounded-lg bg-D2D180 bg-center text-center xl:p-2.5 ${
                          i18n.language === "ar" ? "ml-2" : "mr-2"
                        }`}
                      >
                        <img
                          src={logout}
                          alt="logo"
                          className="w-10 h-10 object-cover rounded-full bg-white"
                        />
                      </span>
                      <span className="text-secondary font-semibold text-base font-sans -ml-3">
                        {t("Log-out")}
                      </span>
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
              ? `${i18n.language === "ar" ? "lg:mr-[300px]" : "lg:ml-[300px]"}`
              : "lg:ml-0"
          }`}
          id="dash"
        >
          <div className="p-0 pb-3 bg-dashboard-color h-auto">
            {/* dashboard Data */}
            <div className="h-auto w-full rounded-md bg-[#FFFFFF] shadow-xl pb-5 mt-3">
              <div
                className={`w-full flex justify-between items-center flex-col  px-3 sm:mb-0 mb-3 ${
                  i18n.language === "ar" ? "sm:flex-row-reverse" : "sm:flex-row"
                }`}
              >
                <div
                  className={`flex ${
                    i18n.language === "ar" ? "justify-end" : "justify-start"
                  } w-full`}
                >
                  <img
                    src={gs1v2logo}
                    onClick={() => navigate("/dashboard")}
                    alt=""
                    className="h-16 w-16 object-contain cursor-pointer"
                  />
                </div>

                <div
                  className={`flex w-full ${
                    i18n.language === "ar" ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  <select className="ml-3 font-sans border border-[#B6BAD6] text-[#643ECF] placeholder:text-[#643ECF] rounded-sm px-2 py-1">
                    <option value="option1">{t("Items")}</option>
                    <option value="option2">{t("Option 2")}</option>
                    <option value="option3">{t("Option 3")}</option>
                  </select>
                  <input
                    type="text"
                    placeholder={t("Search GTIN, Name, Description, Type")}
                    className={`"ml-3 w-full font-sans border border-[#B6BAD6] font-medium placeholder:text-[#643ECF] rounded-sm px-2 py-1 ${
                      i18n.language === "ar" ? "text-end" : "text-start"
                    }`}
                  />
                  <button className="ml-3 bg-[#D9D9D9] rounded-sm px-3 py-1">
                    <BiSearch className="text-xl" />
                  </button>
                </div>
              </div>

              <div
                className="grid 3xl:grid-cols-2 2xl:grid-cols-2 xl:grid-cols-2 lg:grid-cols-2 grid-cols-1 px-3"
                style={{ direction: i18n.language === "ar" ? "rtl" : "ltr" }}
              >
                <div
                  className="flex flex-wrap gap-5"
                  onClick={() => navigate("/Item-Search-Screen")}
                >
                  <div className="flex items-center gap-1 cursor-pointer">
                    <FaListUl className="text-xl text-[#643ECF]" />
                    <p className="font-sans font-medium text-secondary">
                      {t("Item List")}
                    </p>
                  </div>

                  <div className="flex items-center gap-1">
                    <GiPriceTag className="text-xl text-[#643ECF]" />
                    <p className="font-sans font-medium text-secondary">
                      {t("Price")}
                    </p>
                  </div>

                  <div className="flex items-center gap-1">
                    <SlCalender className="text-lg text-[#643ECF]" />
                    <p className="font-sans font-medium text-secondary">
                      {t("Subscription List")}
                    </p>
                  </div>

                  <div className="flex items-center gap-1">
                    <BiSpreadsheet className="text-xl text-[#643ECF]" />
                    <p className="font-sans font-medium text-secondary">
                      {t("Published Supplier List")}
                    </p>
                  </div>
                </div>

                <div
                  className={`flex  justify-end gap-5 ${
                    i18n.language === "ar" ? "flex-wrap-reverse" : "flex-wrap"
                  }`}
                >
                  <div className="flex items-center gap-1">
                    <CiBarcode className="text-xl text-[#643ECF]" />
                    <p className="font-sans font-medium text-secondary">
                      {t("GTIN Search")}
                    </p>
                  </div>

                  <div className="flex items-center gap-1">
                    <IoMdSettings className="text-xl text-[#643ECF]" />
                    <p className="font-sans font-medium text-secondary">
                      {t("adinh-approval")}
                    </p>
                  </div>

                  <div className="flex items-center gap-1">
                    <MdOutlineLiveHelp className="text-xl text-[#643ECF]" />
                    <p className="font-sans font-medium text-secondary">
                      {t("Help")}
                    </p>
                  </div>

                  <div className="flex items-center gap-1">
                    <MdOutlineLogout className="text-xl text-[#643ECF]" />
                    <p className="font-sans font-medium text-secondary">
                      {t("Logout")}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <I18nextProvider i18n={i18ns}>
                      <LanguageSwitcher />
                    </I18nextProvider>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
          {/* {children} */}
        </div>
      </div>
    </>
  );
}

export default AdminSidebar;
