import React, { useEffect, useState } from 'react';
import { FaAngleRight, FaAngleDown } from 'react-icons/fa';
import gs1logowhite from "../../../../Images/gs1logowhite.png"
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CircularProgress } from "@mui/material";
import vectorRequest from '../../../../utils/VectorRequest';
import newRequest from '../../../../utils/userRequest';
import { useTranslation } from "react-i18next";

const CodificationTab = ({ gs1ProductData }) => {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const [subOpen, setSubOpen] = useState(false);
  const [thirdOpen, setThirdOpen] = useState(false);
  const [fourthOpen, setFourthOpen] = useState(false);
  const [hsCode, setHsCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // console.log(gs1ProductData);
  const toggleOpen = () => {
    setOpen(!open);
  };

  const toggleSubOpen = (e) => {
    e.stopPropagation(); // Prevent parent from closing when a sub-item is clicked
    setSubOpen(!subOpen);
  };

  const toggleThirdOpen = (e) => {
    e.stopPropagation(); // Prevent parent from closing when a sub-item is clicked
    setThirdOpen(!thirdOpen);
  };

  const toggleFourthOpen = (e) => {
    e.stopPropagation(); // Prevent parent from closing when a sub-item is clicked
    setFourthOpen(!fourthOpen);
  }


  const [selectedOption, setSelectedOption] = useState("GS1-GPC");
  const [gpcData, setGpcData] = useState([]);
  const [unspsc, setUnspsc] = useState([]);
  const [others, setOthers] = useState([]);

  // State to store the selected row
  const [selectedRow, setSelectedRow] = useState(null);


  const handleRowClick = (item) => {
    // Update the state
    setSelectedRow(item);
  };
  useEffect(() => {
    if (selectedRow) {
      sessionStorage.setItem('selectedRow', JSON.stringify(selectedRow));
      console.log('Selected Row:', selectedRow);
      console.log(selectedRow?.ItemEnglishName);
    }
  }, [selectedRow]);


  const [brickTitleCode, setBrickTitleCode] = useState(''); // State to store the selected brick title

  const getGpcData = async () => {
    try {
      setIsLoading(true);
      const response = await newRequest.get(`/gpc/searchGpcForCodification?gpc=${gs1ProductData}`);
      console.log(response.data);
      setGpcData(response.data);
      const classCode = response.data.data.BrickTitle;
      console.log(classCode);
      setBrickTitleCode(classCode);
      setIsLoading(false);
    } 
    catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message ?? "something went wrong!");
      setGpcData([]);
      setIsLoading(false);
    }
  }


  const getHsCode = async () => {
    try {
      setIsLoading(true);
      // console.log(brickTitleCode);
      const response = await vectorRequest.get(`/findSimilarRecords?text=${brickTitleCode}&tableName=hs_codes`)
      // const response = await vectorRequest.get(`/findSimilarRecords?text=Camel for sports competi&tableName=hs_codes`);
      // console.log(response?.data);
      setHsCode(response?.data);
      setIsLoading(false);
    } 
    catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message ?? "something went wrong!");
      setIsLoading(false);
    }
  };


  // const getUNSPC = (selectedBrickTitle) => {
  //   setIsLoading(true);
  //   axios.post('https://gs1ksa.org/api/GROUTE/find/commodity/by/brick/title', {
  //     "brick_title": selectedBrickTitle
  //     // "brick_title": "Caramel/Toffee Apples" // this is a test
  //   })
  //     .then((response) => {
  //       console.log(response?.data)
  //       setUnspsc(response?.data)
  //       setIsLoading(false);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       toast.error(error?.response?.data?.message ?? "something went wrong!");
  //       setIsLoading(false);
  //     })
  // }
  useEffect(() => {
    getGpcData()
  }
    , []);

  //Second Tab
  const handleOptionChange = (option) => {
    setSelectedOption(option);

    switch (option) {
      case "GS1-GPC":
        getGpcData()
        break;

      case "HS-CODES":
        getHsCode()
        break;


      case "UNSPSC":

        break;

        case "OTHER":
          // setIsLoading(true);
          //   axios.post('https://gs1ksa.org/api/GROUTE/find/brick/by/hs/name', {
          //        "hs_name": selectedRow?.ItemEnglishName
          //     // "hs_name": "Pineapples" // this is a test
          //   })
          //     .then((response) => {
          //       console.log(response?.data)
          //       setOthers(response?.data)
          //       setIsLoading(false);
          //     })
          //     .catch((error) => {
          //       console.log(error);
          //       toast.error(error?.response?.data?.message ?? "something went wrong!");
          //       setIsLoading(false);
          //     })
          break;

      // Add more cases for other options
      default:
        break;
    }
  };
  

  const renderDataGrid = () => {
    switch (selectedOption) {
      case "GS1-GPC":
        return (
          <div>
            {isLoading ? ( 
              <div className="flex justify-center">
                <CircularProgress />
              </div>
            ) : (
              <React.Fragment>
            <div className='flex gap-2 w-full'>
              <span
                className={`bg-[#00acee] w-full py-2 flex justify-center px-1 rounded-md text-white items-center gap-2 cursor-pointer
                    `}
                onClick={() => handleOptionChange("GS1-GPC")}
              >
                <img
                  src={gs1logowhite}
                  className="w-10 h-5 ml-1 object-contain"
                  alt=""
                />
                {t("Global Product Classification (GPC)")}
              </span>
            </div>

            <ul className='h-[80vh] w-full'>
              <li>
                <Link
                  // href="#"
                  onClick={toggleOpen}
                  className={`flex items-center px-4 hover:bg-secondary-100 focus:text-secondary active:text-secondary ${open ? 'text-secondary' : ''}`}
                >
                  {open ? (
                    <FaAngleDown />
                  ) : (
                    <FaAngleRight />
                  )}
                  <h1 className='font-bold'>{t("Segment")}: </h1><span className='ml-2 text-lg'>{gpcData?.data?.SegmentCode} - {gpcData?.data?.SegmentTitle}</span>
                </Link>
                <ul className={`ml-12 mt-2 ${open ? 'block' : 'hidden'}`}>
                  {/* <li className="px-2 text-lg hover:bg-secondary-100">{gpcData?.data?.SegmentCode}</li> */}
                  <li>
                    <Link
                      // href="#"
                      onClick={toggleSubOpen}
                      className={`flex items-center px-2 hover:bg-secondary-100 focus:text-secondary active:text-secondary ${subOpen ? 'text-secondary' : ''}`}
                    >
                      {subOpen ? (
                        <FaAngleDown />
                      ) : (
                        <FaAngleRight />
                      )}
                      <h1 className='font-bold'>{t("FamilyTitle")}: </h1><span className='ml-2 text-lg'>{gpcData?.data?.FamilyCode} - {gpcData?.data?.FamilyTitle}</span>
                    </Link>
                    <ul className={`ml-6 mt-2 ${subOpen ? 'block' : 'hidden'}`}>
                      {/* <li className="px-2 text-lg hover:bg-secondary-100">{gpcData?.data?.FamilyCode}</li> */}
                      <li>
                        <Link
                          // href="#"
                          onClick={toggleThirdOpen}
                          className={`flex items-center px-4 hover:bg-secondary-100 focus:text-secondary active:text-secondary ${thirdOpen ? 'text-secondary' : ''}`}
                        >
                          {thirdOpen ? (
                            <FaAngleDown />
                          ) : (
                            <FaAngleRight />
                          )}
                          <h1 className='font-bold'>{t("Class")}: </h1><span className='ml-2 text-lg'>{gpcData?.data?.ClassCode} - {gpcData?.data?.ClassTitle}</span>
                        </Link>
                        <ul className={`ml-10 mt-2 ${thirdOpen ? 'block' : 'hidden'}`}>
                          {/* <li className="px-2 text-lg hover:bg-secondary-100">{gpcData?.data?.ClassCode}</li> */}
                        </ul>
                      </li>
                      <li>
                        <Link
                          // href="#"
                          onClick={toggleFourthOpen}
                          className={`flex items-center px-10 hover:bg-secondary-100 focus:text-secondary active:text-secondary ${thirdOpen ? 'text-secondary' : ''}`}
                        >
                          {fourthOpen ? (
                            <FaAngleDown />
                          ) : (
                            <FaAngleRight />
                          )}
                          <h1 className='font-bold'>{t("Brick")}: </h1><span className='ml-2 text-lg'>{gpcData?.data?.BrickCode} - {gpcData?.data?.BrickTitle}</span>
                        </Link>
                        <ul className={`ml-16 ${fourthOpen ? 'block' : 'hidden'}`}>
                          {/* <li className="px-2 text-lg hover:bg-secondary-100">{gpcData?.data?.BrickCode}</li> */}
                        </ul>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
            </React.Fragment>
            )}
          </div>
        );


      case "HS-CODES":
        return (
          <div className='h-[80vh] w-full mt-2 px-2 border-2 border-dashed overflow-x-auto'>
            {isLoading ? ( 
              <div className="flex justify-center items-center h-full">
               <CircularProgress />
              </div>
            ) : (
            <React.Fragment>
                {Array.isArray(hsCode) && hsCode.map((item, index) => (
                  <div
                    key={`${item[0]?.metadata['رمز النظام المنسق \r\n Harmonized Code']}-${index}`}  // Use a unique key for each item
                    className={`cursor-pointer flex flex-col gap-2 p-3 rounded-md ${selectedRow === item ? 'bg-gray-200' : 'bg-white'}`}
                    onClick={() => handleRowClick(item)} // Attach the onClick handler
                  >
                    <div className='h-auto w-full shadow-xl p-3 rounded-md'>
                     <h1 className='text-primary'>{t("Harmonized Code")}: <span className='text-black'>{item[0]?.metadata['رمز النظام المنسق \r\n Harmonized Code']}</span></h1>
                     <h1 className='text-primary'>{t("Arabic Name")}: <span className='text-black'>{item[0]?.metadata['الصنف باللغة العربية \r\n Item Arabic Name']}</span></h1>
                     <h1 className='text-primary'>{t("English Name")}: <span className='text-black'>{item[0]?.metadata['الصنف باللغة الانجليزية \r\n Item English Name']}</span></h1>
                     <h1 className='text-primary'>{t("Duty Rate")}: <span className='text-black'>{item[0]?.metadata['فئة الرسم \r\n Duty Rate'] || 'N/A'}</span></h1>
                     <h1 className='text-primary'>{t("Procedures")}: <span className='text-black'>{item[0]?.metadata['الاجراءات \'\r\n Procedures'] || 'N/A'}</span></h1>
                     <h1 className='text-primary'>{t("Date")}: <span className='text-black'>{item[0]?.metadata['التاريخ \r\n Date'] || 'N/A'}</span></h1>
                    <div className='flex justify-end'>
                      <h1 className='text-primary'>{t("Results Rate")}: <span className='text-white font-semibold bg-red-500 px-2 rounded-md'>{item[1]}</span></h1>
                    </div>
                    </div>
                  </div>
                ))}
              </React.Fragment>
              )}
          </div>
        );

      case "UNSPSC":
        return (
          <div className='h-[80vh] w-full mt-2 px-2 border-2 border-dashed overflow-x-auto'>
            {unspsc?.data?.map((group, groupIndex) => (
              <div key={groupIndex}>
                {group.map((item, index) => (
                  <div
                    key={index}
                    className='shadow-xl p-3 rounded-md mb-2'
                  >  
                    <h1 className='text-primary'>{t("Family Title")}: <span className='text-black'>{item.FamilyTitle}</span></h1>
                    <h1 className='text-primary'>{t("Class")}: <span className='text-black'>{item.Class}</span></h1>
                    <h1 className='text-primary'>{t("ClassTitle")}: <span className='text-black'>{item.ClassTitle}</span></h1>
                    <h1 className='text-primary'>{t("Commodity")}: <span className='text-black'>{item.Commodity}</span></h1>
                    <h1 className='text-primary'>{t("CommodityTitle")}: <span className='text-black'>{item.CommodityTitle}</span></h1>
                  </div>
                ))}
              </div>
            ))}
          </div>
        );


      case "OTHER":
        return (
          <div className='h-[80vh] w-full mt-2 px-2 border-2 border-dashed overflow-x-auto'>
            {others?.data?.map((item, index) => (
              <div key={index}>
                <div className='h-auto w-full shadow-xl p-3 rounded-md'>
                  <h1 className='text-primary'>{t("Segment Code")}: <span className='text-black'>{item.SegmentCode}</span></h1>
                  <h1 className='text-primary'>{t("Segment Title")}: <span className='text-black'>{item.SegmentTitle}</span></h1>
                  <h1 className='text-primary'>{t("Family Code")}: <span className='text-black'>{item.FamilyCode}</span></h1>
                  <h1 className='text-primary'>{t("Family Title")}: <span className='text-black'>{item.FamilyTitle}</span></h1>
                  <h1 className='text-primary'>{t("Class Code")}: <span className='text-black'>{item.ClassCode}</span></h1>
                  <h1 className='text-primary'>{t("Class Title")}: <span className='text-black'>{item.ClassTitle}</span></h1>
                  <h1 className='text-primary'>{t("Brick Code")}: <span className='text-black'>{item.BrickCode}</span></h1>
                  <h1 className='text-primary'>{t("Brick Title")}: <span className='text-black'>{item.BrickTitle}</span></h1>
                  <h1 className='text-primary'>{t("Attribute Code")}: <span className='text-black'>{item.AttributeCode}</span></h1>
                  <h1 className='text-primary'>{t("Attribute Title")}: <span className='text-black'>{item.AttributeTitle}</span></h1>
                  <h1 className='text-primary'>{t("Attribute Value Code")}: <span className='text-black'>{item.AttributeValueCode}</span></h1>
                  <h1 className='text-primary'>{t("Attribute Value Title")}: <span className='text-black'>{item.AttributeValueTitle}</span></h1>
                </div>
              </div>
            ))}
          </div>
        );

    }
  }

  return (
    <div
      className={`flex flex-col justify-between gap-2 w-full p-2 ${
        i18n.language === "ar" ? "sm:flex-row-reverse" : "sm:flex-row"
      }`}
    >
      <div className="sm:w-[20%] w-full flex flex-col gap-2 mt-2">
        <span
          className={`bg-[#3b5998] py-2 flex justify-start px-1 rounded-md text-white items-center gap-2 cursor-pointer 
                            }`}
          onClick={() => handleOptionChange("GS1-GPC")}
        >
          <img
            src={gs1logowhite}
            className="w-10 h-5 ml-1 object-contain"
            alt=""
          />
          {t("GS1 GPC")}
        </span>
        <span
          className={`bg-[#00acee] py-2 flex justify-start px-1 rounded-md text-white items-center gap-2 cursor-pointer ${
            selectedOption === "HS-CODES" ? "bg-yellow-500" : ""
          }`}
          onClick={() => handleOptionChange("HS-CODES")}
        >
          <img
            src={gs1logowhite}
            className="w-10 h-5 ml-1 object-contain"
            alt=""
          />
          {t("HS CODES")}
        </span>
        <span
          className={`bg-[#0072b1] py-2 flex justify-start px-1 rounded-md text-white items-center gap-2 cursor-pointer ${
            selectedOption === "UNSPSC" ? "bg-yellow-500" : ""
          }`}
          onClick={() => handleOptionChange("UNSPSC")}
        >
          <img
            src={gs1logowhite}
            className="w-10 h-5 ml-1 object-contain"
            alt=""
          />
          {t("UNSPSC")}
        </span>
        <span
          className={`bg-[#E60023] py-2 flex justify-start px-1 rounded-md text-white items-center gap-2 cursor-pointer ${
            selectedOption === "OTHER" ? "bg-yellow-500" : ""
          }`}
          onClick={() => handleOptionChange("OTHER")}
        >
          <img
            src={gs1logowhite}
            className="w-10 h-5 ml-1 object-contain"
            alt=""
          />
          {t("OTHER")}
        </span>
      </div>

      <div className="sm:w-[80%] w-full h-auto">{renderDataGrid()}</div>
    </div>
  );
};

export default CodificationTab;
