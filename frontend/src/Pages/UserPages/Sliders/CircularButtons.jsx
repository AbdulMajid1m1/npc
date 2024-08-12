import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import gdsn from "../../../Images/circular/gdsn.png";
import data from "../../../Images/circular/data.png";
import gs1 from "../../../Images/circular/gs1.png";
import governance from "../../../Images/circular/governance.png";
import receipts from "../../../Images/circular/receipts.png";
import compliance from "../../../Images/circular/compliance.png";
import certification from "../../../Images/circular/certification.png";
import apicommunity from "../../../Images/circular/apicommunity.png";
import dataquality from "../../../Images/circular/dataquality.png";
import customer from "../../../Images/circular/customer.png";
import { Link } from 'react-router-dom';

const CircularButtons = () => {
  const { t, i18n } = useTranslation();
  const [buttonRadius, setButtonRadius] = useState(150);

  const buttons = [
    { name: 'GDSN', icon: gdsn, link: '/gdsn' },
    { name: 'Brand Owner', icon: data, link: 'http://gs1ksa.org:5021', external: true },
    { name: 'GS1', icon: gs1, link: '/admin-login' },
    { name: 'Governance', icon: governance, link: 'http://gs1ksa.org:5025', external: true },
    { name: 'Subscribers', icon: receipts, link: 'http://gs1ksa.org:5022', external: true },
    { name: 'Compliance', icon: compliance, link: 'http://gs1ksa.org:5024', external: true },
    { name: 'NPC Certification', icon: certification, link: '/npc-certification' },
    { name: 'API Community', icon: apicommunity, link: '/api-community' },
    { name: 'Data Quality Management', icon: dataquality, link: 'http://gs1ksa.org:5023', external: true },
    { name: 'Customer Support', icon: customer, link: '/customer-support' },
  ];

  useEffect(() => {
    // Function to update button radius based on screen size
    const updateButtonRadius = () => {
      const newRadius = window.innerWidth < 640 ? 75 : 150;
      setButtonRadius(newRadius);
    };

    // Update the radius initially and on resize
    updateButtonRadius();
    window.addEventListener('resize', updateButtonRadius);

    // Cleanup listener on unmount
    return () => window.removeEventListener('resize', updateButtonRadius);
  }, []);

  return (
    <div className="relative sm:w-[406px] w-[206px] sm:h-[406px] h-[206px] rounded-full flex justify-center items-center bg-white">
      <div className="absolute sm:w-40 w-20 sm:h-40 h-20 bg-[#0038FF] rounded-full flex justify-center items-center">
        <span className="text-white text-center sm:text-base text-[8px] font-sans font-semibold">National Data Hub (NPC)</span>
      </div>
      {buttons.map((button, index) => (
        <div
          key={index}
          className="absolute flex flex-col items-center"
          style={{
            transform: `rotate(${index * 36}deg) translate(${buttonRadius}px) rotate(-${index * 36}deg)`
          }}
        >
          {button.external ? (
            <a
              href={button.link}
              target="_blank"
              rel="noopener noreferrer"
              className="sm:w-16 w-8 sm:h-16 h-8 bg-white hover:bg-[#DDF3F6] transition-transform transform hover:scale-90 rounded-full shadow-xl flex justify-center items-center"
            >
              <img src={button.icon} alt={button.name} className="sm:w-8 w-4 sm:h-8 h-4" />
            </a>
          ) : (
            <Link
              to={button.link}
              className="sm:w-16 w-8 sm:h-16 h-8 bg-white hover:bg-[#DDF3F6] transition-transform transform hover:scale-90 rounded-full shadow-xl flex justify-center items-center"
            >
              <img src={button.icon} alt={button.name} className="sm:w-8 w-4 sm:h-8 h-4" />
            </Link>
          )}
          <span className="text-center sm:text-[9px] text-[5px] text-secondary font-semibold w-16 mt-1">{button.name}</span>
        </div>
      ))}
    </div>
  );
};

export default CircularButtons;
