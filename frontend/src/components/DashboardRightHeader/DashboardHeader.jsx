import React from "react";
import gs1v2logo from "../../Images/gs1logowhite.png";
import { BiSearch } from "react-icons/bi";
import { FaListUl } from "react-icons/fa";
import { GiPriceTag } from "react-icons/gi";
import { SlCalender } from "react-icons/sl";
import { BiSpreadsheet } from "react-icons/bi";
import { CiBarcode } from "react-icons/ci";
import { IoMdSettings } from "react-icons/io";
import { MdOutlineLiveHelp } from "react-icons/md";
import { MdOutlineLogout } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const DashboardHeader = () => {
  const navigate = useNavigate();
  return (
    <div className="p-3 bg-dashboard-color h-auto">
      {/* dashboard Data */}
      <div className="h-auto w-full rounded-md bg-[#FFFFFF] shadow-xl pb-5 mt-3">
        <div className="w-full flex justify-between items-center flex-col sm:flex-row px-3 sm:mb-0 mb-3">
          <div className="w-full">
            <img src={gs1v2logo}
                onClick={() => navigate("/dashboard")}
                alt="" className="h-16 w-16 object-contain cursor-pointer" />
          </div>

          <div className="flex w-full">
            <select className="ml-3 font-sans border border-[#B6BAD6] text-[#643ECF] placeholder:text-[#643ECF] rounded-sm px-2 py-1">
              <option value="option1">Items</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </select>
            <input
              type="text"
              placeholder="Search GTIN, Name, Description, Type"
              className="ml-3 w-full font-sans border border-[#B6BAD6] font-medium placeholder:text-[#643ECF] rounded-sm px-2 py-1"
            />
            <button className="ml-3 bg-[#D9D9D9] rounded-sm px-3 py-1">
              <BiSearch className="text-xl" />
            </button>
          </div>
        </div>

        <div className="grid 3xl:grid-cols-2 2xl:grid-cols-2 xl:grid-cols-2 lg:grid-cols-2 grid-cols-1 px-3">
          <div className="flex flex-wrap gap-5"
            onClick={() => navigate("/Item-Search-Screen")}
          >
            <div className="flex items-center gap-1 cursor-pointer">
              <FaListUl className="text-xl text-[#643ECF]" />
              <p className="font-sans font-medium text-secondary">Item List</p>
            </div>

            <div className="flex items-center gap-1">
              <GiPriceTag className="text-xl text-[#643ECF]" />
              <p className="font-sans font-medium text-secondary">Price</p>
            </div>

            <div className="flex items-center gap-1">
              <SlCalender className="text-lg text-[#643ECF]" />
              <p className="font-sans font-medium text-secondary">
                Subscription List
              </p>
            </div>

            <div className="flex items-center gap-1">
              <BiSpreadsheet className="text-xl text-[#643ECF]" />
              <p className="font-sans font-medium text-secondary">
                Published Supplier List
              </p>
            </div>
          </div>

          <div className="flex flex-wrap justify-end gap-5">
            <div className="flex items-center gap-1">
              <CiBarcode className="text-xl text-[#643ECF]" />
              <p className="font-sans font-medium text-secondary">
                GTIN Search
              </p>
            </div>

            <div className="flex items-center gap-1">
              <IoMdSettings className="text-xl text-[#643ECF]" />
              <p className="font-sans font-medium text-secondary">
                adinh-approval
              </p>
            </div>

            <div className="flex items-center gap-1">
              <MdOutlineLiveHelp className="text-xl text-[#643ECF]" />
              <p className="font-sans font-medium text-secondary">Help</p>
            </div>

            <div className="flex items-center gap-1">
              <MdOutlineLogout className="text-xl text-[#643ECF]" />
              <p className="font-sans font-medium text-secondary">Logout</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
