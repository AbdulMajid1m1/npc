import React, { useState } from "react";
import headerImage from "../../../../Images/headerImage.png";
import HeaderChange from "../../../../components/Header/Header";
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import SendIcon from '@mui/icons-material/Send';
import { useNavigate } from "react-router-dom";
import newRequest from "../../../../utils/userRequest";
import { toast } from "react-toastify";
import DropDownSelection from "../../../UserPages/DropDownSelection/DropDownSelection";
// import { useTranslation } from 'react-i18next';

const MemberLogin = () => {
  // const { t, i18n } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await newRequest.post("/users/login", {
        email: email,
        password: password,
      });
        // console.log(response?.data);
        sessionStorage.setItem("userGln", JSON.stringify(response.data));
        navigate("/select-gln");
        toast.success(response?.data?.message || "Login Successful");
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Login Failed");
      setLoading(false);
    }
  };

  return (
    <div>
      {/* <div className="sticky top-0 z-50 bg-white">
        <HeaderChange />
      </div> */}
      <div>
        {/* DropDown */}
        <DropDownSelection />
      </div>

      <div className="flex justify-center items-center mt-5 mb-10">
        <div className="sm:h-[725px] h-auto w-[85%] border border-primary rounded-md shadow-xl pb-6 sm:pb-0">
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

          <form onSubmit={handleSubmit} className="w-full flex justify-center items-center h-[45%]">
            {/* username */}
            <div className="w-full sm:w-[50%] sm:px-0 px-4">
              <label
                htmlFor="username"
                className="sm:text-2xl text-secondary text-lg font-sans font-bold"
              >
                Username
              </label>
              <div className="flex flex-col gap-6">
                <input
                  id="username"
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your username"
                  className="p-2 border border-[#B6BAD6] shadow-lg rounded-md"
                />
              </div>

              <div className="mt-6">
                <label
                  htmlFor="password"
                  className="sm:text-2xl text-secondary text-lg font-sans font-bold"
                >
                  Password
                </label>
                <div className="flex flex-col gap-6">
                  <input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="p-2 border border-[#B6BAD6] shadow-lg rounded-md"
                  />
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
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MemberLogin;
