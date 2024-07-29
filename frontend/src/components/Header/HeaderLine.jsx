import React from "react";

const HeaderLine = () => {
  return (
    <div>
      <div className="sm:h-9 h-auto w-full flex justify-end items-center bg-secondary sm:px-10 sm:py-0 py-2 px-2">
        <h2 className="text-white text-sm font-sans text-center">To Serve you Better, Call our Unified Number:
            <i className="fas fa-phone ml-2"></i>
            <span className="text-white font-bold mr-2 ml-2"> 9200-31437</span>
        </h2>
      </div>
    </div>
  );
};

export default HeaderLine;
