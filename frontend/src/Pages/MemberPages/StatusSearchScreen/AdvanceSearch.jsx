import React, { useState } from 'react'
import SideNav from '../../../components/Sidebar/SideNav'
import { Autocomplete, TextField } from '@mui/material';
import reload from "../../../Images/refresh.png"
import deleteicon from '../../../Images/Deleteicon.png'
import { useNavigate } from 'react-router-dom';

export default function AdvanceSearch() {
    const [activeForm, setActiveForm] = useState("AdvanceSearch");
    const [inputs, setInputs] = useState([{ id: 1 }]); // Initialize with one input field
    const navigate = useNavigate();

    const handleAddCriterion = () => {
        const newInputs = [...inputs, { id: inputs.length + 1 }];
        setInputs(newInputs);
    };


    const handleInputChange = (index, value) => {
        const newInputs = [...inputs];
        newInputs[index] = value;
        setInputs(newInputs);
    };

    const handleDeleteCriterion = (id) => {
        if (inputs.length === 1) return; // Don't delete if only one input remains
        const updatedInputs = inputs.filter((input) => input.id !== id);
        setInputs(updatedInputs);
    };

    const [inputsor, setInputsor] = useState([{ id: 1 }]); // Initialize with one input field

    const handleAddCriterionor = () => {
        const newInputs = [...inputsor, { id: inputsor.length + 1 }];
        setInputsor(newInputs);
    };

    const handleDeleteCriterionor = (id) => {
        if (inputsor.length === 1) return; // Don't delete if only one input remains
        const updatedInputs = inputsor.filter((input) => input.id !== id);
        setInputsor(updatedInputs);
    };

    return (
        <div>
            <SideNav>
                <div className="p-3 mb-20 bg-dashboard-color">
                    <div className="rounded-md bg-[#FFFFFF] shadow-xl">
                        {/* Item Search screen  */}
                        <div className="h-auto w-full flex sm:justify-start items-center mt-6">
                            <div className="flex sm:justify-between justify-center items-center flex-wrap w-full mt-5 md-mt-5 smm-mt-3 sm:text-center">
                                <p
                                    className={`cursor-pointer font-medium font-sans text-4xl py-2 sm:py-0 px-4 ml-3 rounded-lg sm-mt-5 ${activeForm === "AdvanceSearch"
                                            ? " text-[#1F0567]"
                                            : "text-[#1F0567B5]"
                                        }`}
                                    onClick={() => setActiveForm("AdvanceSearch")}
                                >
                                    Advance Search
                                </p>
                                <p
                                    className={`cursor-pointer font-medium font-sans text-4xl py-2 sm:py-0 px-4 ml-3 rounded-lg sm-mt-5 ${activeForm === "SmartSearch"
                                            ? " text-[#1F0567]"
                                            : "text-[#1F0567B5]"
                                        }`}
                                    onClick={() => setActiveForm("SmartSearch")}
                                >
                                    Smart Search
                                </p>
                            </div>
                        </div>
                        {/* serach */}
                        <div className="h-auto w-full flex px-4 md-px-4 smm-px-0 flex-col mt-6">
                            {activeForm === "AdvanceSearch" && (
                                <>
                                    <h2 className="text-secondary font-sans font-medium text-xl">
                                        Item must match all the criteria (AND)
                                    </h2>
                                    <div className="w-full my-6">
                                        {inputs.map((input, index) => (
                                            <div
                                                key={input.id}
                                                className="mx-auto flex flex-col sm:flex-row   gap-5 my-4"
                                            >
                                                <div className=" font-body gap-0 w-1/2 ">
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
                                                </div>
                                                <div className=" font-body sm:text-base text-sm flex flex-col gap-0 w-1/2">
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
                                                </div>
                                                <div className="w-full font-body sm:text-base text-sm flex flex-col gap-0">
                                                    <input
                                                        type="text"
                                                        id="fields1"
                                                        // onChange={(e) => setProductNameEnglish(e.target.value)}
                                                        // value={productNameEnglish}
                                                        className="border-1 rounded-sm bg-white border-[#8E9CAB] p-1 md:p-1 smm:p-1"
                                                    />
                                                </div>
                                                <div className="w-1/2 border border-solid border-[#8E9CAB] rounded p-3">
                                                    <div className="flex gap-5 justify-center">
                                                        <img src={reload} alt="" />
                                                        <img
                                                            src={deleteicon}
                                                            alt=""
                                                            onClick={() => handleDeleteCriterion(input.id)}
                                                            className="cursor-pointer"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}

                                        <div className="flex justify-start mt-10">
                                            <button
                                                onClick={handleAddCriterion}
                                                className="font-inter font-medium text-white text-lg bg-[#006E7D] hover:bg-purple-700 py-2 px-2 md:py-3 md:px-20 rounded-sm"
                                            >
                                                Add criterion
                                            </button>
                                        </div>
                                    </div>

                                    <h2 className="text-secondary font-sans font-medium text-xl">
                                        Item must match atleast one criterion (OR)
                                    </h2>
                                    <div className="w-full my-6">
                                        {inputsor.map((input, index) => (
                                            <div
                                                key={input.id}
                                                className="mx-auto flex flex-col sm:flex-row   gap-5 my-4"
                                            >
                                                <div className=" font-body gap-0 w-1/2 ">
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
                                                </div>
                                                <div className=" font-body sm:text-base text-sm flex flex-col gap-0 w-1/2">
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
                                                </div>
                                                <div className="w-full font-body sm:text-base text-sm flex flex-col gap-0">
                                                    <input
                                                        type="text"
                                                        id="fields1"
                                                        // onChange={(e) => setProductNameEnglish(e.target.value)}
                                                        // value={productNameEnglish}
                                                        className="border-1 rounded-sm bg-white border-[#8E9CAB] p-1 md:p-1 smm:p-1"
                                                    />
                                                </div>
                                                <div className="w-1/2 border border-solid border-[#8E9CAB] rounded p-3">
                                                    <div className="flex gap-5 justify-center">
                                                        <img src={reload} alt="" />
                                                        <img
                                                            src={deleteicon}
                                                            alt=""
                                                            onClick={() => handleDeleteCriterionor(input.id)}
                                                            className="cursor-pointer"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}

                                        <div className="flex justify-start mt-10">
                                            <button
                                                onClick={handleAddCriterionor}
                                                className="font-inter font-medium text-white text-lg bg-[#006E7D] hover:bg-purple-700 py-2 px-2 md:py-3 md:px-20 rounded-sm"
                                            >
                                                Add criterion
                                            </button>
                                        </div>
                                    </div>
                                    <div className="flex justify-end my-10">
                                        <button
                                            type="button"
                                            onClick={() => navigate(-1)}
                                            className="font-inter font-medium text-white text-lg md:text-xl py-2 px-3 md:py-3 md:px-10 rounded-sm bg-red-600 mx-5 md-:mx-10"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => navigate('/search-profile')} 
                                            className="font-inter font-medium text-white text-lg md:text-xl py-2 px-3 md:py-3 md:px-10 rounded-sm bg-applybtn mx-5 md-:mx-10"
                                        >
                                            Apply
                                        </button>
                                        <button 
                                            onClick={() => navigate('/search-profile')} 
                                            className="font-inter font-medium text-white text-lg bg-serachbtn hover:bg-purple-700 py-2 px-3 md:py-3 md:px-10 rounded-sm mx-4">
                                            Search
                                        </button>
                                    </div>
                                </>
                            )}

                            {/* Form for SmartSearch */}
                            {activeForm === "SmartSearch" && (
                                <>
                                    <h2 className="text-secondary font-sans font-medium text-xl">
                                        Select one of the searches to search criteria opens
                                    </h2>
                                    <div className="my-5 smm-my-2 gap-4 mx-2 ">
                                        <div>
                                            <input
                                                id="terms"
                                                type="checkbox"
                                                // onChange={handleTermsAndCondition}
                                                // checked={isChecked}
                                                required
                                                className="bg-[#8E9CAB] rounded-sm transform scale-150"
                                            />
                                            <label
                                                className="text-secondary font-body pl-2 cursor-pointer"
                                                htmlFor="terms"
                                            >
                                                Show items with prices
                                            </label>
                                        </div>
                                        <div className="my-4">
                                            <input
                                                id="withoutprice"
                                                type="checkbox"
                                                // onChange={handleTermsAndCondition}
                                                // checked={isChecked}
                                                required
                                                className="bg-[#8E9CAB] rounded-sm transform scale-150"
                                            />
                                            <label
                                                className="text-secondary font-body pl-2 cursor-pointer"
                                                htmlFor="withoutprice"
                                            >
                                                Show items without prices
                                            </label>
                                        </div>
                                    </div>
                                    <div className="h-[5px] w-full bg-secondary"></div>
                                    <div className=" my-10  w-full flex flex-col sm:flex-row  gap-5">
                                        <div className='w-full my-auto'>
                                            <input id="radio"
                                                placeholder="radio"
                                                defaultChecked
                                                type="radio"
                                                className="border-1 border-[#8E9CAB] w-5 h-5 rounded-sm p-2 mb-3"
                                            />
                                            <label
                                                className="text-secondary font-body pl-2 cursor-pointer"
                                                htmlFor="withoutprice"
                                            >
                                                Show items modified between
                                            </label>
                                        </div>
                                        <div className="w-full">
                                            <input type="date" name="" id=""
                                                className="border-1 border-[#8E9CAB]  rounded-sm py-3 px-2 mb-3 w-full" />

                                        </div>
                                        <p className="text-secondary font-body  rounded-sm py-3 px-2 mb-3" >
                                            and
                                        </p>
                                        <div className="w-full">
                                            <input type="date" name="" id=""
                                                className="border-1 border-[#8E9CAB]  rounded-sm py-3 px-2 mb-3 w-full" />

                                        </div>
                                    </div>
                                    <div className="flex justify-end my-10">
                                        <button
                                            type="button"
                                            // onClick={() => navigate(-1)}
                                            className="font-inter font-medium text-white text-lg md:text-xl py-2 px-3 md:py-3 md:px-10 rounded-sm bg-red-600 mx-5 md-:mx-10"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            // type="button"
                                            onClick={() => navigate('/search-profile')}
                                            className="font-inter font-medium text-white text-lg md:text-xl py-2 px-3 md:py-3 md:px-10 rounded-sm bg-applybtn mx-5 md-:mx-10"
                                        >
                                            Apply
                                        </button>
                                        <button
                                            onClick={() => navigate('/search-profile')} 
                                            className="font-inter font-medium text-white text-lg bg-serachbtn hover:bg-purple-700 py-2 px-3 md:py-3 md:px-10 rounded-sm mx-4">
                                            Search
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </SideNav>
        </div>
    );
}
