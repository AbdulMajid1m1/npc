import React, { useEffect } from 'react'
import gs1v2logo from "../../../Images/gs1logowhite.png"
// import SideNav from '../../../components/Sidebar/SideNav';
import { I18nextProvider, useTranslation } from "react-i18next";

const MemberNewDashboard = () => {
  const { t, i18n } = useTranslation();
  useEffect(() => {
    // auto scroll to bottom
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [])
  return (
    <>
    {/* <DashboardHeader /> */}
    {/* <SideNav> */}
    <div className='mb-20 bg-dashboard-color p-3'>
        {/* dashboard Data */}
        <div className={`3xl:h-32 2xl:h-32 xl:h-32 lg:h-32 md:h-32 h-auto w-full flex  items-center rounded-md bg-[#FFFFFF] shadow-xl mt-3 ${i18n.language==='ar'? 'sm:justify-end':'sm:justify-start'}`}>
          <div className={`flex sm:justify-start justify-center items-center flex-wrap 3xl:gap-24 2xl:gap-24 xl:gap-24 lg:gap-24 md:gap-10 gap-4 ${i18n.language==='ar'? 'mr-3 flex-row-reverse':'ml-3 flex-row'}`}>
            <img onClick={() => navigate('/')} src={gs1v2logo} className='sm:h-20 h-auto sm:w-auto w-36 cursor-pointer' alt='' />
            <div className=''>
              <p className='text-secondary font-bold font-sans sm:text-4xl text-2xl'>{t("National Product Catalouge")} </p>
              <p className={`text-secondary font-sans mt-[2px] ${i18n.language==='ar'?'text-right':'text-left'}`}>{t("A Service of GS1 Saudi Arabia Barcode Center")}</p>
            </div>
          </div>  
            
        </div>


        {/* Dashboard Header */}
        <div className='3xl:h-32 2xl:h-32 xl:h-32 lg:h-32 md:h-32 h-auto w-full flex sm:justify-start items-center rounded-md bg-[#FFFFFF] shadow-xl mt-6'>
            <div className={`flex sm:justify-between justify-center items-center flex-wrap w-full ${i18n.language==='ar'?'flex-row-reverse':'flex-row'}`}>
              <p className={`text-secondary font-medium font-sans text-4xl sm:py-0 py-6 ${i18n.language==='ar'?'mr-3':'ml-3'}`}>{t("Dashboard")}</p>
              <p className={`text-secondary font-sans  mt-6 ${i18n.language==='ar'?'ml-3':'mr-3'}`}>{t("Report Creation Date")}: 10/05/2024  10:15 </p>
            </div>    
        </div>


        {/* Dashboard Cards */}
        <div className="mx-auto grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {/* first Card */}
          <div className="p-3 rounded-md bg-[#FFFFFF] shadow-xl sm:mt-12 mt-6 hover:shadow-xl hover:transform hover:scale-105 duration-300 "
          >
           <h2 className='text-secondary font-sans font-medium text-xl'>Supplier Information</h2>
           <div className='h-[1px] w-full bg-secondary'></div>

           <div className='flex justify-between items-center px-3 mt-5'>
            <div>
              <h2 className='text-secondary font-sans font-medium sm:text-xl text-lg'>18</h2>
              <p className='text-[#006E7D] font-sans font-medium'>Suppliers</p>
            </div>
            <div>
              <h2 className='text-secondary font-sans font-medium sm:text-xl text-lg'>6</h2>
              <p className='text-[#006E7D] font-sans font-medium'>Cleansing Supplier</p>
            </div>
           </div>

           <div className='flex justify-between items-center px-3 mb-8 mt-10'>
            <div>
              <h2 className='text-secondary font-sans font-medium sm:text-xl text-lg'>18</h2>
              <p className='text-[#006E7D] font-sans font-medium'>Suppliers</p>
            </div>
           </div>

          </div>


          {/* second Card */}
          <div className="p-3 rounded-md bg-[#FFFFFF] shadow-xl sm:mt-12 mt-6 hover:shadow-xl hover:transform hover:scale-105 duration-300 "
          >
           <h2 className='text-secondary font-sans font-medium text-xl'>Item Information</h2>
           <div className='h-[1px] w-full bg-secondary'></div>

           <div className='flex justify-between items-center px-3 mt-5'>
            <div>
              <h2 className='text-secondary font-sans font-medium sm:text-xl text-lg'>206</h2>
              <p className='text-[#006E7D] font-sans font-medium'>items</p>
            </div>
            {/* <div>
              <h2 className='text-secondary font-sans font-medium sm:text-xl text-lg'>6</h2>
              <p className='text-[#006E7D] font-sans font-medium'>Cleansing Supplier</p>
            </div> */}
           </div>

           <div className='flex justify-between items-center px-3 mb-8 mt-10'>
            <div>
              <h2 className='text-secondary font-sans font-medium sm:text-xl text-lg'>12</h2>
              <p className='text-[#006E7D] font-sans font-medium'>Items recieved in the last 30 days</p>
              <p className='font-sans font-medium mt-6'>last item recieved: at 10/05/2024  09: 16</p>
            </div>
           </div>

          </div>


          {/* third Card */}
          <div className="p-3 rounded-md bg-[#FFFFFF] shadow-xl sm:mt-12 mt-6 hover:shadow-xl hover:transform hover:scale-105 duration-300 "
          >
           <h2 className='text-secondary font-sans font-medium text-xl'>Price Information</h2>
           <div className='h-[1px] w-full bg-secondary'></div>

           <div className='flex justify-between items-center px-3 mt-5'>
            <div>
              <h2 className='text-secondary font-sans font-medium sm:text-xl text-lg'>56</h2>
              <p className='text-[#006E7D] font-sans font-medium'>Items with prices</p>
            </div>
            <div>
              <h2 className='text-secondary font-sans font-medium sm:text-xl text-lg'>131</h2>
              <p className='text-[#006E7D] font-sans font-medium'>Prices</p>
            </div>
           </div>

           <div className='flex justify-between items-center px-3 mb-8 mt-10'>
            <div>
              <h2 className='text-secondary font-sans font-medium sm:text-xl text-lg'>30</h2>
              <p className='text-[#006E7D] font-sans font-medium'>Items recieved in the last 30 days</p>
              <p className='font-sans font-medium mt-6'>last item recieved: at 10/05/2024  09: 16</p>
            </div>
           </div>
           
          </div>


          {/* fourth Card */}
          <div className="p-3 rounded-md bg-[#FFFFFF] shadow-xl sm:mt-12 mt-6 hover:shadow-xl hover:transform hover:scale-105 duration-300 "
          >
           <h2 className='text-secondary font-sans font-medium text-xl'>Reciepient Delivery</h2>
           <div className='h-[1px] w-full bg-secondary'></div>

           <div className='flex justify-between items-center px-3 mt-5'>
            <div>
              <h2 className='text-secondary font-sans font-medium sm:text-xl text-lg'>11</h2>
              <p className='text-[#006E7D] font-sans font-medium'>Items delivered in the last 30 days</p>
              <p className='font-sans font-medium'>last item recieved: at 10/05/2024  09: 16</p>
            </div>
           </div>

           <div className='flex justify-between items-center px-3 mb-8 mt-3'>
            <div>
              <h2 className='text-secondary font-sans font-medium sm:text-xl text-lg'>14</h2>
              <p className='text-[#006E7D] font-sans font-medium'>Items recieved in the last 30 days</p>
              <p className='font-sans font-medium'>last item recieved: at 10/05/2024  09: 16</p>
            </div>
           </div>
           
          </div>

        </div>
    </div>
    {/* </SideNav> */}
    </>
  )
}

export default MemberNewDashboard