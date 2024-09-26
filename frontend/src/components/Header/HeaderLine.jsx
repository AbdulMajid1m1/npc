import React from "react";
import { I18nextProvider, useTranslation } from 'react-i18next';
import LanguageSwitcher from "../../switer"
import i18n from '../../i18n';

const HeaderLine = () => {
  const { t } = useTranslation();

  return (
    <div>
      <div className="sm:h-9 h-auto w-full flex justify-between items-center bg-secondary sm:px-10 sm:py-0 py-2 px-2">
        <div className='w-full sm:w-auto '>
          <I18nextProvider i18n={i18n}>
            <LanguageSwitcher />
          </I18nextProvider>
        </div>
        <h2 className="text-white text-sm font-sans text-center">To Serve you Better, Call our Unified Number:
            <i className="fas fa-phone ml-2"></i>
            <span className="text-white font-bold mr-2 ml-2"> 9200-31437</span>
        </h2>
      </div>
    </div>
  );
};

export default HeaderLine;
