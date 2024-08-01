import React from 'react'
import gs1logowhite from "../../Images/gs1logowhite.png"
import { useNavigate } from 'react-router-dom'
import { I18nextProvider, useTranslation } from 'react-i18next';
// import LanguageSwitcher from "../../switer"
import i18n from '../../i18n';

const Header = () => {
  const { t } = useTranslation();

  const navigate = useNavigate()

  return (
    <div>
      <div className='sticky top-0 z-50 bg-white '>
        <div className={`h-auto w-full bg-gray-100 flex flex-col sm:flex-row justify-between items-center px-4 py-4  ${i18n.language === 'ar' ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}>
          {/* Logo and Text */}
          <div
          className={`flex items-center flex-wrap mb-4 sm:mb-0 ${i18n.language === 'ar' ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}>
            <img onClick={() => navigate('/')} src={gs1logowhite} className='h-14 w-auto cursor-pointer' alt='' />
            <div className='text-center px-2 font-sans'>
              <p className='text-secondary font-semibold'>{t('GS1 Saudia Arabia')}</p>
              <p className='text-secondary'>{t('The Global Language of Business')}</p>
            </div>
          </div>

          <div>
            <button className='md:text-2xl text-base bg-primary2 text-white px-5 py-1 font-sans rounded-md transition-transform transform hover:scale-90'>Your One Source of Reliable Data</button>
          </div>

          {/* Buttons */}
          {/* <div 
          className={`flex flex-wrap justify-center ${i18n.language === 'ar' ? 'flex-row-reverse' : 'flex-row'}`}
          >
            <div className=''>
              <div className='flex justify-end items-end px-1 gap-3 font-sans font-semibold'>
                <span onClick={() => navigate('/admin-login')} className='text-secondary transition-transform transform hover:scale-125 cursor-pointer'>{t('Admin Login')}</span>
              </div>
              <div className='flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2'>
                <button
                  onClick={() => navigate('/select-business-type')}
                  className='bg-secondary text-white px-5 py-1 font-sans rounded-md transition-transform transform hover:scale-90'
                >
                  {t('Register to NPC')}
                </button>

                <button
                  onClick={() => navigate('/login-npc')}
                  className='bg-primary2 text-white px-5 py-1 font-sans rounded-md transition-transform transform hover:scale-90'
                >
                  {t('Login to NPC')}
                </button>

              </div>
            </div>

            <div className='w-full sm:w-auto'>
              <I18nextProvider i18n={i18n}>
                <LanguageSwitcher />
              </I18nextProvider>
            </div>



          </div> */}

        </div>
      </div>
      {/* End Nav */}
    </div>
  )
}

export default Header