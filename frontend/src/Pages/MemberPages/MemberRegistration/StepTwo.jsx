import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import "./SummaryTable.css";

const StepTwo = () => {
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
          className={`h-28 w-[97%] text-center text-white font-sans font-medium sm:text-3xl text-lg rounded-lg p-3 bg-secondary sm:gap-7 gap-4`}
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
    <div className="flex justify-center items-center -mt-5">
      <div className="w-full bg-[#E6F6F8] shadow-xl rounded-md p-6">
        <p className={`sm:text-2xl w-full font-bold text-sm text-secondary mt-5`}>
          NPC Services
        </p>
        <div className="flex flex-col sm:flex-row justify-between items-start gap-6 mt-5">
          <div className="w-full sm:w-1/2">
            <label htmlFor="registerType" className="block mb-2 ml-1 font-semibold text-secondary font-sans">
              CR Activity
            </label>
            <select
              type="text"
              id="registerType"
              className="w-full p-2 pl-4 border border-gray-300 rounded-full text-secondary placeholder:text-secondary"
            >
                <option value="">Select Registration type</option>
                <option value="1">CR Activity 1</option>
                <option value="2">CR Activity 2</option>
              </select>

            <label htmlFor="subtype" className="block mt-4 mb-2 ml-1 font-semibold text-secondary font-sans">
              Sub Type
            </label>
            <select
              type="text"
              id="subtype"
              className="w-full p-2 pl-4 border border-gray-300 rounded-full text-secondary placeholder:text-secondary"
            >
              <option value="">Select Services</option>
              <option value="1">service 1</option>
              <option value="2">service 2</option>
            </select>
          </div>

          <div className="w-full sm:w-1/2">
            <label htmlFor="subtype" className="block mb-2 ml-1 font-semibold text-secondary font-sans">
              Sub Type
            </label>
            <select
              type="text"
              id="subtype"
              className="w-full p-2 pl-4 border border-gray-300 rounded-full text-secondary placeholder:text-secondary"
            >
              <option value="">Select Sub Type</option>
              <option value="1">Subtype 1</option>
              <option value="2">Subtype 2</option>
            </select>
          </div>
        </div>
        

        {/* Table */}
        <div
        className={` ${
            i18n.language === "ar" ? "text-end" : "text-start"
        }`}
        >
        <div className="mt-6 bg-white p-3">
            <label className="text-secondary text-3xl font-sans font-bold">
            {t("Your Subscription")}
            </label>
            <div className="table-Bintobin-Axapta px-4">
            <p className="text-secondary text-2xl font-sans font-bold text-center mb-4 mt-4">
                {t("Subscription Summary")}
            </p>
            <table>
                <thead>
                <tr>
                    <th>{t("PRODUCT")}</th>
                    <th>{t("REGISTRATION FEE")}</th>
                    <th>{t("YEARLY FEE")}</th>
                    <th>{t("PRICE")}</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>Product 1</td>
                    <td>100</td>
                    <td>200</td>
                    <td>300</td>
                </tr>
                <tr>
                    <td>Product 2</td>
                    <td>150</td>
                    <td>250</td>
                    <td>400</td>
                </tr>
                </tbody>
                <tfoot>
                <tr>
                    <td colSpan="3" className="text-right font-bold">
                    {t("Total")}:
                    </td>
                    <td>1550</td>
                </tr>
                </tfoot>
            </table>
            </div>
        </div>
      </div>

      </div>
    </div>
    </div>
  );
};

export default StepTwo;
