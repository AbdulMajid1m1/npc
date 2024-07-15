import React, { useState } from "react";
import SideNav from "../../../components/Sidebar/SideNav";
import { Autocomplete, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function ItemSearchScreen() {
  const [activeForm, setActiveForm] = useState("itemSearch");
  const navigate = useNavigate();
  return (
    <div>
      <SideNav>
        <div className="p-3 mb-20 bg-dashboard-color">
          <div className="rounded-md bg-[#FFFFFF] shadow-xl">
            {/* Item Search screen  */}
            <div className="h-auto w-full flex sm:justify-start items-center mt-6">
              <div className="flex sm:justify-between justify-center items-center flex-wrap w-full mt-5 md-mt-5 smm-mt-3 sm:text-center">
                <p
                  className={`cursor-pointer font-medium font-sans text-4xl py-2 sm:py-0 px-4 ml-3 rounded-lg sm-mt-5 ${
                    activeForm === "itemSearch"
                      ? "bg-[#F35C0875] text-[#802d3b]"
                      : "text-secondary"
                  }`}
                  onClick={() => setActiveForm("itemSearch")}
                >
                  Item Search
                </p>
                <p
                  className={`cursor-pointer font-medium font-sans text-4xl py-2 sm:py-0 px-4 ml-3 rounded-md sm-mt-5 ${
                    activeForm === "price"
                      ? "bg-[#F35C0875] text-[#802d3b]"
                      : "text-secondary"
                  }`}
                  onClick={() => setActiveForm("price")}
                >
                  Price
                </p>
                <p
                  className={`cursor-pointer font-medium font-sans text-4xl mr-7 py-2 rounded-lg sm-mt-5 sm:py-0 md-mr-7 sm-mr-0 ${
                    activeForm === "relationshipDetails"
                      ? "bg-[#F35C0875] text-[#802d3b]"
                      : "text-secondary"
                  }`}
                  onClick={() => setActiveForm("relationshipDetails")}
                >
                  Relationship details
                </p>
              </div>
            </div>
            {/* serach */}
            <div className="h-auto w-full flex px-4 md-px-4 smm-px-0 flex-col mt-6">
              <h2 className="text-secondary font-sans font-medium text-xl">
                Item Details
              </h2>
              {activeForm === "itemSearch" && (
                <div className="w-full my-6">
                  <div className="mx-auto grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 my-4">
                    <div className="w-full font-body sm:text-base text-sm flex flex-col gap-0">
                      <label htmlFor="fields1" className="text-secondary">
                        GTIN
                      </label>
                      <input
                        type="text"
                        id="fields1"
                        // onChange={(e) => setProductNameEnglish(e.target.value)}
                        // value={productNameEnglish}
                        className="border-1 rounded-sm bg-white border-[#8E9CAB] p-1 md:p-1 smm:p-1"
                      />
                    </div>

                    <div className="w-full font-body sm:text-base text-sm flex flex-col gap-0">
                      <label htmlFor="fields2" className="text-secondary">
                        Information Provider GLN
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
                            className="bg-white border border-secondary text-white text-xs rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full "
                            // required
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
                  </div>

                  <div className="mx-auto grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 my-6">
                    <div className="w-full font-body sm:text-base text-sm flex flex-col gap-0">
                      <label htmlFor="fields1" className="text-secondary">
                        Target Market Country Code
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
                            className="bg-white border border-secondary text-white text-xs rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 md:p-2.5"
                            // required
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

                    <div className="w-full font-body sm:text-base text-sm flex flex-col gap-0">
                      <label htmlFor="fields2" className="text-secondary">
                        Classification category Code
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
                            className="bg-white border border-secondary text-white text-xs rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 md:p-2.5"
                            // required
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
                  </div>

                  {/* <div className="flex justify-center mt-10">
                    <button
                      type="button"
                      onClick={() => navigate(-1)}
                      className="font-inter font-medium text-white text-lg md:text-xl py-2 px-3 md:py-3 md:px-10 rounded-sm bg-red-600 mx-5 md-:mx-10"
                    >
                      Reset
                    </button>
                    <button
                      type="submit"
                      className="font-inter font-medium text-white text-lg bg-purple-800 hover:bg-purple-700 py-2 px-3 md:py-3 md:px-20 rounded-sm mx-4"
                    >
                      Search
                    </button>
                  </div> */}
                </div>
              )}

              {/* Form for Price */}
              {activeForm === "price" && (
                <form action="" className="w-100 my-6">
                  <form action="" className="w-100 my-6">
                    <div className="mx-auto grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 my-4">
                      <div className="w-full font-body sm:text-base text-sm flex flex-col gap-0">
                        <label htmlFor="fields1" className="text-secondary">
                          GTIN
                        </label>
                        <input
                          type="text"
                          id="fields1"
                          // onChange={(e) => setProductNameEnglish(e.target.value)}
                          // value={productNameEnglish}
                          className="border-1 rounded-sm bg-white border-[#8E9CAB] p-1 md:p-1 smm:p-1"
                        />
                      </div>

                      <div className="w-full font-body sm:text-base text-sm flex flex-col gap-0">
                        <label htmlFor="fields2" className="text-secondary">
                          Information Provider GLN
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
                              className="bg-white border border-secondary text-white text-xs rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full "
                              // required
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
                    </div>

                    <div className="mx-auto grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 my-6">
                      <div className="w-full font-body sm:text-base text-sm flex flex-col gap-0">
                        <label htmlFor="fields1" className="text-secondary">
                          Target Market Country Code
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
                              className="bg-white border border-secondary text-white text-xs rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 md:p-2.5"
                              // required
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

                      <div className="w-full font-body sm:text-base text-sm flex flex-col gap-0">
                        <label htmlFor="fields2" className="text-secondary">
                          Classification category Code
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
                              className="bg-white border border-secondary text-white text-xs rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 md:p-2.5"
                              // required
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
                    </div>

                    {/* <div className="flex justify-center mt-10">
                      <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="font-inter font-medium text-white text-lg md:text-xl py-2 px-3 md:py-3 md:px-10 rounded-sm bg-red-600 mx-5 md-:mx-10"
                      >
                        Reset
                      </button>
                      <button
                        type="submit"
                        className="font-inter font-medium text-white text-lg bg-purple-800 hover:bg-purple-700 py-2 px-3 md:py-3 md:px-20 rounded-sm mx-4"
                      >
                        Search
                      </button>
                    </div> */}
                  </form>
                </form>
              )}

              {/* Form for Relationship details */}
              {activeForm === "relationshipDetails" && (
                <form action="" className="w-100 my-6">
                  <form action="" className="w-100 my-6">
                    <form action="" className="w-100 my-6">
                      <div className="mx-auto grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 my-4">
                        <div className="w-full font-body sm:text-base text-sm flex flex-col gap-0">
                          <label htmlFor="fields1" className="text-secondary">
                            GTIN
                          </label>
                          <input
                            type="text"
                            id="fields1"
                            // onChange={(e) => setProductNameEnglish(e.target.value)}
                            // value={productNameEnglish}
                            className="border-1 rounded-sm bg-white border-[#8E9CAB] p-1 md:p-1 smm:p-1"
                          />
                        </div>

                        <div className="w-full font-body sm:text-base text-sm flex flex-col gap-0">
                          <label htmlFor="fields2" className="text-secondary">
                            Information Provider GLN
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
                                className="bg-white border border-secondary text-white text-xs rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full "
                                // required
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
                      </div>

                      <div className="mx-auto grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 my-6">
                        <div className="w-full font-body sm:text-base text-sm flex flex-col gap-0">
                          <label htmlFor="fields1" className="text-secondary">
                            Target Market Country Code
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
                                className="bg-white border border-secondary text-white text-xs rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 md:p-2.5"
                                // required
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

                        <div className="w-full font-body sm:text-base text-sm flex flex-col gap-0">
                          <label htmlFor="fields2" className="text-secondary">
                            Classification category Code
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
                                className="bg-white border border-secondary text-white text-xs rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 md:p-2.5"
                                // required
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
                      </div>

                      {/* <div className="flex justify-center mt-10">
                        <button
                          type="button"
                          onClick={() => navigate(-1)}
                          className="font-inter font-medium text-white text-lg md:text-xl py-2 px-3 md:py-3 md:px-10 rounded-sm bg-red-600 mx-5 md-:mx-10"
                        >
                          Reset
                        </button>
                        <button
                          onClick={() => navigate('AdvanceSearch')}
                          type="button"
                          className="font-inter font-medium text-white text-lg bg-purple-800 hover:bg-purple-700 py-2 px-3 md:py-3 md:px-20 rounded-sm mx-4"
                        >
                          Search
                        </button>
                      </div> */}
                    </form>
                  </form>
                </form>
              )}
            </div>

            <div className="flex justify-end items-end mt-10 px-10">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="font-inter font-medium mb-3 text-white text-lg md:text-xl py-2 px-3 md:py-3 md:px-10 rounded-sm bg-red-600 mx-5 md-:mx-10"
              >
                Reset
              </button>
              <button
                onClick={() => navigate("/Status-Search-Screen")}
                type="button"
                className="font-inter font-medium mb-3 text-white text-lg bg-purple-800 hover:bg-purple-700 py-2 px-3 md:py-3 md:px-20 rounded-sm mx-4"
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </SideNav>
    </div>
  );
}
