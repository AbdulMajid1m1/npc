import React from 'react'
import gs1v2logo from "../../Images/logo.png"
import { useNavigate } from 'react-router-dom'
// import { I18nextProvider, useTranslation } from 'react-i18next';
import LanguageSwitcher from "../../switer"
// import i18n from '../../i18n';

const HeaderChange = () => {
  // const { t } = useTranslation();

  const navigate = useNavigate()

  return (
    <div>

      <div className='sticky top-0 z-50 bg-white'>
        <div className={`h-auto w-full bg-gray-100 flex flex-col sm:flex-row justify-between items-center px-4 py-4 `}>
          {/* Logo and Text */}
          <div className='flex justify-between items-center flex-wrap w-full mb-4 sm:mb-0'>
            <img onClick={() => navigate('/')} src={gs1v2logo} className='h-14 w-auto cursor-pointer' alt='' />
            <p onClick={() => navigate('/admin-login')} className='text-secondary text-center font-bold font-body hover:text-primary hover:cursor-pointer'>NPC Admin Login</p>
          </div>
        </div>
      </div>
      {/* End Nav */}
    </div>
  )
}

export default HeaderChange