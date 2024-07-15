import React, { useState } from "react";
import headerImage from "../../../../Images/headerImage.png";
import HeaderChange from "../../../../components/Header/HeaderChange";
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import SendIcon from '@mui/icons-material/Send';
import { useNavigate } from "react-router-dom";
import { Autocomplete, TextField } from "@mui/material";
import { toast } from "react-toastify";
import newRequest from "../../../../utils/userRequest";
// import { useTranslation } from 'react-i18next';

const SelectGln = () => {
  // const { t, i18n } = useTranslation();
  const [selectedGlnList, setSelectedGlnList] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const getGlnData = sessionStorage.getItem("userGln");
  const glnData = JSON.parse(getGlnData);
  // console.log(glnData);

  const handleGlnList = (event, value) => {
    // console.log(value);
    setSelectedGlnList(value);
  };


  const handleSubmitGln = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await newRequest.post("/loginGtrackgln", {
        user_id: glnData?.user_id,
        GLNBarcodeNumber: selectedGlnList?.gln,
        // email: glnData?.email,
        // password: glnData?.password,
      });
        // console.log(response?.data);
        navigate("/dashboard");
        toast.success(response?.data?.message || "Login Successful");
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Login Failed");
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="sticky top-0 z-50 bg-white">
        <HeaderChange />
      </div>

      <div className="flex justify-center items-center mt-5 mb-10">
        <div className="sm:h-[725px] h-auto sm:py-0 py-10 w-[85%] border border-primary rounded-md shadow-xl">
          <div className="flex flex-col justify-center items-center">
            <h2 className="text-secondary font-medium font-body sm:text-2xl text-lg mt-3">
              Welcome to the
            </h2>
            <h2 className="text-secondary text-center font-bold font-body sm:text-2xl text-lg mt-3">
              National Product Catalouge{" "}
            </h2>
          </div>
          <div className="mt-2 px-2">
            <p className="h-2 w-full bg-[#F35C08]"></p>
          </div>

          {/* image */}
          <div className="flex justify-center items-center px-2">
            <img
              src={headerImage}
              alt=""
              className="h-40 w-full sm:object-contain object-cover"
            />
          </div>

          <form onSubmit={handleSubmitGln} className="w-full flex justify-center items-center h-[45%]">
            {/* gln */}
            <div className="w-full sm:w-[50%] sm:px-0 px-4">
              <label
                htmlFor="gln"
                className="sm:text-2xl text-secondary text-lg font-sans font-bold"
              >
                GLN
              </label>
              <div className="flex flex-col gap-6">
                <Autocomplete
                  id="gln"
                  options={glnData?.gln || []}
                  getOptionLabel={(option) => option?.location || ''}
                  onChange={handleGlnList}
                  value={selectedGlnList}
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
                      className="bg-gray-50 border border-gray-300 text-white text-xs rounded-sm focus:ring-blue-500 focus:border-blue-500 p-1.5 md:p-2.5"
                      placeholder={"GLN"}
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
                
              {/* <button
                onClick={() => navigate("/dashboard")}
                className="w-full bg-[#B6BAD6] border-b-2 border-[#350F9F] hover:bg-[#9699b1]  shadow-xl text-white font-medium font-body text-xl rounded-md px-5 py-2"
              >
                Login
              </button> */}
                <Button
                  variant="contained"
                  type="submit"
                  style={{ backgroundColor: '#B6BAD6', color: '#ffffff' }}
                  disabled={loading}
                  className="w-full bg-[#B6BAD6] border-b-2 border-[#350F9F] hover:bg-[#9699b1] shadow-xl mb-6 text-white font-medium font-body text-xl rounded-md px-5 py-2"
                  endIcon={loading ? <CircularProgress size={24} color="inherit" /> : <SendIcon />}
                >
                  Login
                </Button>
              </div>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default SelectGln;
