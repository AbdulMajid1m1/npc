import React from "react";
import gs1v2logo from "../../../Images/gs1logowhite.png";
import SideNav from "../../../components/Sidebar/SideNav";
import { Autocomplete, TextField } from "@mui/material";

const SearchProfile = () => {
  return (
    <SideNav>
      <div className="p-3 mb-20 bg-dashboard-color">
        {/* Dashboard Cards */}
        <div className="mx-auto flex flex-col sm:flex-row items-stretch gap-5 my-4">
          {/* first Card */}
          <div className="flex-1 p-3 rounded-md bg-[#FFFFFF] shadow-xl h-full sm:h-auto md:h-[85vh]">
            <p className="text-secondary  font-medium font-sans text-4xl py-6 pl-3">
              Search Profile
            </p>

            <div className="flex flex-col gap-6">
              {/* Autocomplete */}
              <div className="w-full sm:w-auto md:w-1/2">
                <Autocomplete
                  id="field1"
                  options={[]}
                  filterOptions={(options, state) => options}
                  onInputChange={(event, value) => {
                    if (!value) {
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
                      className="bg-white border border-[#350F9F] text-white text-xs rounded-sm font-sans focus:ring-blue-500 focus:border-blue-500 w-full sm:w-auto md:w-1/2"
                      required
                      placeholder="Search"
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
              </div>
              {/* Buttons */}
              <div className="flex justify-end absolute sm-relative bottom-12 right-0 mb-4 mr-4 flex items-center">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="font-sans font-medium text-white text-lg md:text-xl py-2 px-3 md:py-3 md:px-10 rounded-sm bg-red-600 mx-2 shadow-md"
                >
                  Delete
                </button>
                <button
                  type="submit"
                  className="font-sans font-medium text-white text-lg bg-serachbtn hover:bg-purple-700 py-2 px-3 md:py-3 md:px-20 rounded-sm mx-2 shadow-md"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SideNav>
  );
};

export default SearchProfile;
