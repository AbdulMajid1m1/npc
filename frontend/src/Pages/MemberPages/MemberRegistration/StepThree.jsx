import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import "./SummaryTable.css";
import mastercard from "../../../Images/registrationimages/mastercard.png"
import maestro from "../../../Images/registrationimages/maestro.png"
import visa from "../../../Images/registrationimages/visa.png"
import visaelectron from "../../../Images/registrationimages/visaelectron.png"
import cirrus from "../../../Images/registrationimages/cirrus.jpg"
import americanexpress from "../../../Images/registrationimages/americanexpress.png"
import paypal from "../../../Images/registrationimages/paypal.png"

const StepThree = () => {
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
          <p
            className={`sm:text-2xl w-full font-bold text-sm text-secondary mt-5`}
          >
            Payment
          </p>
          {/* Table */}
          <div
            className={` ${i18n.language === "ar" ? "text-end" : "text-start"}`}
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
          

          {/* Payment Methods and Terms */}
          <div className="">
            <h2 className="font-sans text-secondary font-semibold sm:text-2xl text-lg mt-6">Payment Type</h2>
            <div className="bg-white mt-6 p-6 rounded-md shadow-md mb-4">
              <div className="grid grid-cols-2 gap-4">
                {/* Payment Options */}
                <div className="flex flex-wrap gap-4">
                  <label className="flex items-center space-x-2">
                    <input type="radio" name="payment" className="form-radio" />
                    <img
                      src={mastercard}
                      alt="Mastercard"
                      className="h-8"
                    />
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="radio" name="payment" className="form-radio" />
                    <img
                      src={maestro}
                      alt="Visa"
                      className="h-8"
                    />
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="radio" name="payment" className="form-radio" />
                    <img
                      src={americanexpress}
                      alt="American Express"
                      className="h-8"
                    />
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="radio" name="payment" className="form-radio" />
                    <img
                      src={paypal}
                      alt="PayPal"
                      className="h-8"
                    />
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="radio" name="payment" className="form-radio" />
                    <img
                      src={visa}
                      alt="Maestro"
                      className="h-8"
                    />
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="radio" name="payment" className="form-radio" />
                    <img
                      src={cirrus}
                      alt="Cirrus"
                      className="h-8"
                    />
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="radio" name="payment" className="form-radio" />
                    <img
                      src={visaelectron}
                      alt="Visa Electron"
                      className="h-8"
                    />
                  </label>
                </div>
                <div className="flex flex-wrap flex-col gap-4">
                  <label className="flex items-center space-x-2">
                    <input type="radio" name="payment" className="form-radio" />
                    <span className="text-sm">Bank Transfer</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="radio" name="payment" className="form-radio" />
                    <span className="text-sm">Visa / Master Card</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="radio" name="payment" className="form-radio" />
                    <span className="text-sm">Debit Online</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="flex items-center mt-4">
              <input
                type="checkbox"
                id="terms"
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <label htmlFor="terms" className="ml-2 text-sm">
                {t("Accept the Terms & Conditions")} (
                <a href="#" className="text-blue-600 underline">
                  {t("Download Terms & Conditions")}
                </a>
                )
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepThree;
