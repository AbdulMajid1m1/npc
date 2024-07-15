import React from "react";
import gs1v2logo from "../../../Images/gs1logowhite.png";
import SideNav from "../../../components/Sidebar/SideNav";
import { Autocomplete, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

const StatusSearchScreen = () => {
  const navigate = useNavigate();
  return (
    <SideNav>
      <div className="p-3 mb-20 bg-dashboard-color">
        {/* Dashboard Cards */}
        <div className="mx-auto grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
          {/* first Card */}
          <div className="p-3 rounded-md bg-[#FFFFFF] shadow-xl sm:mt-12 mt-6">
            <p className="text-secondary font-medium font-sans text-4xl sm:py-0 py-6 ml-3">
              Status Filter
            </p>

            <div className="w-full font-body sm:text-base text-sm flex flex-col gap-0  mt-6 md-mt-5 smm-mt-2">
              <label htmlFor="fields2" className="text-secondary my-3">
                Status Filter
              </label>
              <Autocomplete
                id="field1"
                options={[]}
                filterOptions={(options, state) => options} // Here you handle the filter function
                onInputChange={(event, value) => {
                  if (!value) {
                    // perform operation when input is cleared
                    console.log("Input cleared");
                  }
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    InputProps={{
                      ...params.InputProps,
                      className: "text-white",
                    }}
                    InputLabelProps={{
                      ...params.InputLabelProps,
                      style: { color: "white" },
                    }}
                    className="bg-white border border-[#350F9F] text-white text-xs rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full "
                    required
                  />
                )}
                classes={{
                  endAdornment: "text-white",
                }}
                sx={{
                  "& .MuiAutocomplete-endAdornment": {
                    color: "white",
                  },
                }}
              />
              <div className="flex justify-center mt-10">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="font-inter font-medium text-white text-lg md:text-xl py-2 px-3 md:py-3 md:px-10 rounded-sm bg-red-600 mx-5 md-:mx-10"
                >
                  Reset
                </button>
                <button
                  onClick={() => navigate("/advance-search")}
                  type="button"
                  className="font-inter font-medium text-white text-lg bg-purple-800 hover:bg-purple-700 py-2 px-3 md:py-3 md:px-20 rounded-sm mx-4"
                >
                  Search
                </button>
              </div>
            </div>
          </div>
          <div className="col-span-1"></div>
          {/* second Card */}
          <div className="p-3 rounded-md bg-[#FFFFFF] shadow-xl sm:mt-12 mt-6">
            <p className="text-secondary font-medium font-sans text-4xl sm:py-0 py-6 ml-3">
              Text Search
            </p>

            <div className="w-full font-body sm:text-base text-sm flex flex-col gap-0  mt-6 md-mt-5 smm-mt-2">
              <label htmlFor="fields2" className="text-secondary my-3">
                Text Search
              </label>
              <textarea
                className="border-1 rounded-sm bg-white border-[#350F9F] p-1 md:p-1 smm:p-1"
                // cols="30"
                required
              ></textarea>
              <div className="flex justify-center mt-10">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="font-inter font-medium text-white text-lg md:text-xl py-2 px-3 md:py-3 md:px-10 rounded-sm bg-red-600 mx-5 md-:mx-10"
                >
                  Reset
                </button>
                <button
                  onClick={() => navigate("/advance-search")}
                  type="button"
                  className="font-inter font-medium text-white text-lg bg-purple-800 hover:bg-purple-700 py-2 px-3 md:py-3 md:px-20 rounded-sm mx-4"
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SideNav>
  );
};

export default StatusSearchScreen;
