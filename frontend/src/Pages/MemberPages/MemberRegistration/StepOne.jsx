import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

const StepOne = () => {
  const { t, i18n } = useTranslation();
  
  useEffect(() => {
    // auto scroll to bottom
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [])
  
  return (
    <div>
      {/* Top Header */}
      <div className="flex justify-center items-center">
        <div
          className={`h-28 w-[97%] text-center text-white font-sans font-medium sm:text-3xl text-lg rounded-lg p-3 bg-[#0C08D3] sm:gap-7 gap-4`}
        >
           <p>National Product Catalogue (NPC)</p>
        </div>
      </div>

      <div className="flex justify-center items-center">
        <div
          className={`h-20 sm:w-[90%] bg-primary2 shadow-xl rounded-md -mt-10 z-10 flex justify-between items-center gap-1 px-10 ${
            i18n.language === "ar" ? "flex-row-reverse" : "flex-row"
          }`}
        >
          <p className="sm:text-2xl text-white text-lg font-sans font-semibold">
            Member Registration
          </p>
        </div>
      </div>

       {/* Form Section */}
      <div className="flex justify-center items-center -mt-5">
        <div className="w-full bg-[#E6F6F8] shadow-xl rounded-md p-6">
            <p className={`sm:text-2xl w-full font-bold text-sm text-secondary mt-5`}>
              Company Information
            </p>
            <p className={`text-red-500 text-lg font-body font-medium pt-3`}>
              **Provide Your company Certificate of Registration**
            </p>
          <div className="flex flex-col sm:flex-row justify-between items-start gap-6 mt-5">
            <div className="w-full sm:w-1/2">
              <label htmlFor="crNumber" className="block mb-2 font-semibold text-secondary font-sans">
                CR Number
              </label>
              <input
                type="text"
                id="crNumber"
                placeholder="Enter CR number"
                className="w-full p-2 border border-gray-300 rounded text-secondary placeholder:text-secondary"
              />

              <label htmlFor="email" className="block mt-4 mb-2 font-semibold text-secondary font-sans">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter email address"
                className="w-full p-2 border border-gray-300 rounded text-secondary placeholder:text-secondary"
              />

              <label htmlFor="companyNameEnglish" className="block mt-4 mb-2 font-semibold text-secondary font-sans">
                Company Name (English)
              </label>
              <input
                type="text"
                id="companyNameEnglish"
                placeholder="English"
                className="w-full p-2 border border-gray-300 rounded text-secondary placeholder:text-secondary"
              />

              <label htmlFor="companyLandline" className="block mt-4 mb-2 font-semibold text-secondary font-sans">
                Company Landline
              </label>
              <div className="flex">
                <span className="flex items-center justify-center px-3 border border-r-0 border-gray-300 bg-gray-200 rounded text-secondary placeholder:text-secondary-l">
                  +966
                </span>
                <input
                  type="text"
                  id="companyLandline"
                  placeholder="Enter number"
                  className="w-full p-2 border border-gray-300 rounded text-secondary placeholder:text-secondary-r"
                />
              </div>

              <label htmlFor="country" className="block mt-4 mb-2 font-semibold text-secondary font-sans">
                Country
              </label>
              <select id="country" className="w-full p-2 border border-gray-300 rounded text-secondary placeholder:text-secondary">
                <option>Select country</option>
                {/* Add options here */}
              </select>

              <label htmlFor="city" className="block mt-4 mb-2 font-semibold text-secondary font-sans">
                City
              </label>
              <select id="city" className="w-full p-2 border border-gray-300 rounded text-secondary placeholder:text-secondary">
                <option>Select city</option>
                {/* Add options here */}
              </select>
            </div>

            <div className="w-full sm:w-1/2">
              <label htmlFor="crActivity" className="block mb-2 font-semibold text-secondary font-sans">
                CR Activity
              </label>
              <input
                type="text"
                id="crActivity"
                placeholder="Enter CR activity"
                className="w-full p-2 border border-gray-300 rounded text-secondary placeholder:text-secondary"
              />

              <label htmlFor="contactPerson" className="block mt-4 mb-2 font-semibold text-secondary font-sans">
                Contact Person
              </label>
              <input
                type="text"
                id="contactPerson"
                placeholder="Enter contact person"
                className="w-full p-2 border border-gray-300 rounded text-secondary placeholder:text-secondary"
              />

              <label htmlFor="companyNameArabic" className="block mt-4 mb-2 font-semibold text-secondary font-sans">
                Company Name (Arabic)
              </label>
              <input
                type="text"
                id="companyNameArabic"
                placeholder="Arabic"
                className="w-full p-2 border border-gray-300 rounded text-secondary placeholder:text-secondary"
              />

              <label htmlFor="mobileNumber" className="block mt-4 mb-2 font-semibold text-secondary font-sans">
                Mobile Number (Omit zero)
              </label>
              <div className="flex">
                <span className="flex items-center justify-center px-3 border border-r-0 border-gray-300 bg-gray-200 rounded text-secondary placeholder:text-secondary-l">
                  +966
                </span>
                <input
                  type="text"
                  id="mobileNumber"
                  placeholder="Enter number"
                  className="w-full p-2 border border-gray-300 rounded-r"
                />
              </div>

              <label htmlFor="province" className="block mt-4 mb-2 font-semibold text-secondary font-sans">
                Province
              </label>
              <select id="province" className="w-full p-2 border border-gray-300 rounded">
                <option>Select province</option>
                {/* Add options here */}
              </select>

              <label htmlFor="zipCode" className="block mt-4 mb-2 font-semibold text-secondary font-sans">
                Zip Code
              </label>
              <input
                type="text"
                id="zipCode"
                placeholder="Enter Zip code"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default StepOne;
