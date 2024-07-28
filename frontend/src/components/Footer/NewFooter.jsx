import React, { useState } from 'react'
// import whatsApp from "../../Images/whatsapp.png"
// import facebook from "../../Images/facebook.png"
// import twitter from "../../Images/twitter.png"
// import instagram from "../../Images/instagram.png"
// import youtube from "../../Images/youtube.png"
// import linkedIn from "../../Images/linkedin.png"
import { useTranslation } from 'react-i18next';
import i18n from '../../i18n'
import newRequest from '../../utils/userRequest'
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { toast } from 'react-toastify'
const NewFooter = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await newRequest.post('/website/subscribeNewsletter', {
        email: email,
      });
      // console.log(res?.data);
      toast.success(res?.data?.message || `${t("Email sent successfully!")}`);
      setEmail('');
    } 
    catch (error) {
      // console.log(error);
      toast.error(error.response?.data?.error || "Email sending failed!");
    } 
    finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className='py-4 gap-2 sm:px-16 px-8 3xl::h-[335px] 2xl:h-[335px] xl:h-[335px] lg:h-[351px] h-auto w-full bg-secondary relative'>

        <div className='w-full grid 2xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 grid-cols-1'>
          <div className={`h-auto w-full flex flex-col gap-8 relative ${i18n.language === 'ar' ? 'order-last' : 'order-first'}`}>
            <div className={`text-gray-300 flex flex-col items-${i18n.language === 'ar' ? 'end' : 'start'} gap-2 pt-10`}>
                <a href="https://gs1.org.sa/how-to-get-barcode" target="_blank" rel="noopener noreferrer" className='transition-colors duration-300 hover:text-primary cursor-pointer inline-block'> {t('Need a GS1 barcode')}</a>
                <a href="https://gs1.org.sa/about-us" target="_blank" rel="noopener noreferrer" className='transition-colors duration-300 hover:text-primary cursor-pointer inline-block'> {t('GS1 General Specifications')}</a>
                <a href="https://gs1.org.sa/gs1-system-standards" target="_blank" rel="noopener noreferrer" className='transition-colors duration-300 hover:text-primary cursor-pointer inline-block'> {t('GS1 Standards')}</a>
                <a href="https://gs1.org.sa/privacypolicymobileapp" target="_blank" rel="noopener noreferrer" className='transition-colors duration-300 hover:text-primary cursor-pointer inline-block'> {t('Privacy Policy')}</a>
            </div>
          </div>

          <div className={`h-auto w-full flex flex-col gap-8 relative `}>
            <div className={`text-gray-300 flex flex-col gap-1 pt-10 ${i18n.language === 'ar' ? 'text-end' : 'text-start'}`}
            >
            <div className="">
                <h2 className="sm:text-3xl text-xl text-left font-sans inline-block font-semibold text-white">{t("Sign up for Our Newsletter")}</h2>
                <p className="text-white text-base pl-px mt-3">
                    {t("Email")}
                </p>
                <form onSubmit={handleSubmit} className={`mt-2 w-full flex flex-col md:flex-col  justify-center items-center ${i18n.language === 'ar' ? "lg:flex-row-reverse" : 'lg:flex-row'}`}>
                    <div className="flex items-center w-full">
                        <input
                         type="email"
                         onChange={(e) => setEmail(e.target.value)}
                         placeholder={t('Enter your Email')}
                         className={`w-full px-2 py-[6px] placeholder:text-black text-black shadow-inner rounded-md border border-gray-400 focus:outline-none ${i18n.language === 'ar' ? 'text-end' : 'text-start'}`} required /> 
                    </div>
                    <div className={`flex justify-center items-center w-[40%] sm:mt-0 mt-2  ${i18n.language === 'ar' ? 'mr-2' : 'ml-2'}`}>
                        <Button
                          variant="contained"
                          style={{ backgroundColor: "#0FECB7", color: "#ffffff" }}
                          type="submit"
                          disabled={loading}
                          className="ml-2 w-full"
                          endIcon={loading ? <CircularProgress size={24} color="inherit" /> : null
                          }
                        >
                          {t("Submit now")}
                        </Button>
                    </div>
                </form>
            </div>
            </div>
          </div>

          
        </div>


        <div className={`flex flex-col justify-center items-center sm:mt-20 mt-6 sm:flex-row sm:justify-between sm:items-center `}>
          <h2 className='text-white font-normal font-sans sm:font-semibold mb-2 sm:mb-0'> {t('Copyright @GS1 Saudi Arabia - 2024 All rights reserved.')}</h2>
          <div className='hidden flex-wrap gap-4'>
            {/* <a href="https://api.whatsapp.com/send?text=YourShareTextHere&phone=+966112182428" target="_blank" rel="noopener noreferrer">
              <img
                src={whatsApp}
                alt=""
                className='h-12 w-12 p-2 object-contain hover:scale-110 hover:animate-pulse transition-transform duration-300 ease-in-out'
              />
            </a>
            <a href="https://www.linkedin.com/in/gs1-saudi-ksa-389876263/" target="_blank" rel="noopener noreferrer">
              <img
                src={linkedIn}
                alt=""
                className='h-12 w-12 p-2 object-contain hover:scale-110 hover:animate-pulse transition-transform duration-300 ease-in-out'
              />
            </a>
            <a href="https://www.linkedin.com/in/gs1-saudi-ksa-389876263/" target="_blank" rel="noopener noreferrer">
              <img
                src={facebook}
                alt=""
                className='h-12 w-12 p-2 object-contain hover:scale-110 hover:animate-pulse transition-transform duration-300 ease-in-out'
              />
            </a>
            <a href="https://twitter.com/gs1Saudi" target="_blank" rel="noopener noreferrer">
              <img
                src={twitter}
                alt=""
                className='h-12 w-12 p-2 object-contain hover:scale-110 hover:animate-pulse transition-transform duration-300 ease-in-out'
              />
            </a>
            <a href="https://www.instagram.com/gs1saudi/" target="_blank" rel="noopener noreferrer">
              <img
                src={instagram}
                alt=""
                className='h-12 w-12 p-2 object-contain hover:scale-110 hover:animate-pulse transition-transform duration-300 ease-in-out'
              />
            </a>
            <a href="https://www.youtube.com/@gs1global/videos" target="_blank" rel="noopener noreferrer">
              <img
                src={youtube}
                alt=""
                className='h-12 w-12 p-2 object-contain hover:scale-110 hover:animate-pulse transition-transform duration-300 ease-in-out'
              />
            </a> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewFooter