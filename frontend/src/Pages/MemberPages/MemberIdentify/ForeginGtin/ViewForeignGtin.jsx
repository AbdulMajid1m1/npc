import React, { useEffect, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import DashboardRightHeader from "../../../../components/DashboardRightHeader/DashboardRightHeader";
import { BarcodeGenerator, DataMatrixGenerator } from "../../../../utils/Barcodes/Barcodes";
import { useTranslation } from 'react-i18next';

const ViewForeignGtin = () => {
    const memberDataString = sessionStorage.getItem('memberData');
    const memberData = JSON.parse(memberDataString);
    const { t, i18n } = useTranslation();
    // console.log(memberData);
    const [isLoading, setIsLoading] = useState(false);
    const [unitCode, setUnitCode] = useState([]);
    const [allCountryName, setAllCountryName] = useState([]);
    const [gpcList, setGpcList] = useState([]); // gpc list
    const [packageType, setPackageType] = useState([
        'Box',
        'Carton',
    ]);
    const [brandNameEnglish, setBrandNameEnglish] = useState([]);
    const [open, setOpen] = useState(false);
    const [autocompleteLoading, setAutocompleteLoading] = useState(false);
    const navigate = useNavigate();
    let { productId } = useParams();


    // set the all state values
    const [productNameEnglish, setProductNameEnglish] = useState('');
    const [size, setSize] = useState('');
    const [gpc, setGpc] = useState(null);
    const [gpcCode, setGpcCode] = useState('');
    const [barcode, setBarcode] = useState('');
    const [selectedBrandNameEnglish, setSelectedBrandNameEnglish] = useState('');
    const [selectedUnitCode, setSelectedUnitCode] = useState('');
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedPackageType, setSelectedPackageType] = useState('');
    const [companyId, setCompanyId] = useState('');

    const selectedGtinData = JSON.parse(
        sessionStorage.getItem("selectedProductData")
    );
    //   console.log(selectedGtinData);

    useEffect(() => {
        setIsLoading(true);
        const fetchProductDetails = async () => {
            try {
                // const response = await newRequest.get(`/products?id=${productId}`);
                // console.log(response.data[0]);

                // const productData = response.data[0];
                const productData = selectedGtinData;
                setProductNameEnglish(productData?.productnameenglish);
                setSelectedBrandNameEnglish(productData?.BrandName);
                setSelectedPackageType(productData?.moName);
                setSelectedUnitCode(productData?.unit);
                setSize(productData?.size);
                setBarcode(productData?.barcode);
                setSelectedCountry(productData?.countrySale);
                setGpcCode(productData?.gpc_code);
                setGpc(productData?.gpc);
                setCompanyId(productData?.companyId);

                setIsLoading(false);

            } catch (error) {
                console.log(error);
                setIsLoading(false);

            }
        };
        fetchProductDetails();
    }, [productId]);


    const handleUnitCodeChange = (event, value) => {
        console.log(value);
        setSelectedUnitCode(value);
    };

    const handleAllCounrtyName = (event, value) => {
        console.log(value);
        setSelectedCountry(value);
    };

    const handlePackageType = (event, value) => {
        console.log(value);
        setSelectedPackageType(value);
    };

    const handleBrandNameEnglish = (event, value) => {
        console.log(value);
        setSelectedBrandNameEnglish(value);
    };


    const handleGPCAutoCompleteChange = (event, value) => {
        console.log(value);
        setGpc(value);
        setGpcCode(value);
    }


    const handleAutoCompleteInputChange = async (event, newInputValue, reason) => {
        // console.log(reason)
    }


    return (
        <>
            <div className={`p-0 h-full bg-slate-100 ${i18n.language === 'ar' ? 'sm:mr-72' : 'sm:ml-72'}`}>
                <div>
                    <DashboardRightHeader title={`${t('View Foreign GTIN')}`}
                    />
                </div>

                <div className="flex flex-col justify-center items-center p-4">
                    {" "}
                    <div className="h-auto w-full p-5 bg-white mb-5">
                        <div className="">
                            <div className={`flex justify-between  flex-wrap w-full font-body p-6 shadow-xl rounded-md text-black bg-[#C3E2DC] text-xl mb:2 md:mb-5 ${i18n.language === 'ar' ? 'sm:flex-row-reverse' : 'sm:flex-row'}`}>
                                <div className={`flex justify-start flex-col gap-2 text-xs sm:text-sm ${i18n.language === 'ar' ? 'text-end' : 'text-start'}`}>
                                    <p className="font-semibold"> {t('Complete Data')}</p>
                                    <p>

                                        {i18n.language === 'ar' ? (
                                            <>
                                                <span className="font-semibold">{memberData?.company_name_arabic}</span>
                                                :: {t('This number is registered to company')}
                                            </>
                                        ) : (
                                            <>
                                                {t('This number is registered to company')}: :{" "}
                                                <span className="font-semibold">{memberData?.company_name_eng}</span>
                                            </>
                                        )}
                                        {/* <span className="font-semibold">Hasnain, Majid</span> */}
                                    </p>
                                </div>

                                <div className="flex gap-10" style={{ height: '60px' }}>
                                    <div>
                                        <BarcodeGenerator text={barcode} />
                                    </div>
                                    <DataMatrixGenerator
                                        text={barcode}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* <form onSubmit={handleFormSubmit}> */}
                        <div className="flex flex-col sm:gap-8 gap-3 sm:flex-row sm:justify-between sm:mt-0 mt-4">
                            <div className="w-full font-body sm:text-base text-sm flex flex-col gap-0">
                                <label htmlFor="fields1" className={`text-secondary ${i18n.language === 'ar' ? 'text-right' : 'text-left'}`}>{t('Product')} {t('Name[English]')}</label>
                                <input
                                    type="text"
                                    id="fields1"
                                    disabled={true}
                                    onChange={(e) => setProductNameEnglish(e.target.value)}
                                    value={productNameEnglish}
                                    className={`border-1 w-full rounded-sm border-[#8E9CAB] p-2 ${i18n.language === 'ar' ? ' text-right' : 'text-left'}`}
                                    placeholder={`${t('Enter')} ${t('Product')} ${t('Name[English]')}`}
                                />
                            </div>

                            <div className="w-full font-body sm:text-base text-sm flex flex-col gap-0">
                                <label htmlFor="fields2" className={`text-secondary ${i18n.language === 'ar' ? 'text-right' : 'text-left'}`}>{t("Barcode")}</label>
                                <input
                                    type="text"
                                    id="fields2"
                                    disabled={true}
                                    className={`border-1 w-full rounded-sm border-[#8E9CAB] p-2 ${i18n.language === 'ar' ? ' text-right' : 'text-left'}`}
                                    value={barcode}
                                    onChange={(e) => setProductNameArabic(e.target.value)}
                                    placeholder={`${t('Enter')} ${t('Product')} ${t('Name[Arabic]')}`}
                                />
                            </div>
                        </div>

                        <div className="w-full h-[2px] bg-primary mb-6 mt-6"></div>

                        <div className="">
                            <div className="flex flex-col sm:gap-8 gap-3 sm:flex-row sm:justify-between mb-3">
                                <div className="w-full font-body sm:text-base text-sm flex flex-col gap-0">
                                    <label htmlFor="field1" className={`text-secondary ${i18n.language === 'ar' ? 'text-right' : 'text-left'}`}>{t('Brands')} {t('Name[English]')} </label>
                                    <Autocomplete
                                        id="field1"
                                        disabled={true}
                                        options={brandNameEnglish}
                                        getOptionLabel={(option) => option}
                                        onChange={handleBrandNameEnglish}
                                        value={selectedBrandNameEnglish}
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
                                                    dir: i18n.language === "ar" ? "rtl" : "ltr",
                                                }}
                                                InputLabelProps={{
                                                    ...params.InputLabelProps,
                                                    style: { color: "white" },
                                                }}
                                                className="bg-gray-50 border border-gray-300 text-white text-xs rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 md:p-2.5"
                                                placeholder={`${t('Enter')} ${t('Brands')} ${t('Name[English]')}`}
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
                                </div>

                                <div className="w-full font-body sm:text-base text-sm flex flex-col gap-0">
                                    <label htmlFor="field3" className={`text-secondary ${i18n.language === 'ar' ? 'text-right' : 'text-left'}`}>{t('Unit Code')}</label>
                                    <Autocomplete
                                        id="field3"
                                        disabled={true}
                                        options={unitCode}
                                        getOptionLabel={(option) => option}
                                        onChange={handleUnitCodeChange}
                                        value={selectedUnitCode}
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
                                                    dir: i18n.language === "ar" ? "rtl" : "ltr",
                                                }}
                                                InputLabelProps={{
                                                    ...params.InputLabelProps,
                                                    style: { color: "white" },
                                                }}
                                                className="bg-gray-50 border border-gray-300 text-white text-xs rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 md:p-2.5"
                                                placeholder={`${t('Enter')}/${t('Unit Code')}`}
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
                                    {/* </div> */}
                                </div>

                            </div>


                            <div className="flex flex-col sm:gap-8 gap-3 sm:flex-row sm:justify-between">
                                {/* <div className="form-row"> */}
                                <div className="w-full font-body sm:text-base text-sm flex flex-col gap-0">
                                    <label htmlFor="field4" className={`text-secondary ${i18n.language === 'ar' ? 'text-right' : 'text-left'}`}>{t('Size')}</label>
                                    <input
                                        type="text"
                                        disabled={true}
                                        id="field4"
                                        onChange={(e) => setSize(e.target.value)}
                                        value={size}
                                        className={`border-1 w-full rounded-sm border-[#8E9CAB] p-2 ${i18n.language === 'ar' ? ' text-right' : 'text-left'}`}
                                        placeholder={`${t('Enter')} ${t('Size')}`}
                                    />
                                </div>

                                <div className="w-full font-body sm:text-base text-sm flex flex-col gap-0">
                                    <label htmlFor="field6" className={`text-secondary ${i18n.language === 'ar' ? 'text-right' : 'text-left'}`}>{t('Country of Sale')}</label>
                                    <Autocomplete
                                        id="field6"
                                        disabled={true}
                                        options={allCountryName}
                                        getOptionLabel={(option) => option}
                                        onChange={handleAllCounrtyName}
                                        value={selectedCountry}
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
                                                    dir: i18n.language === "ar" ? "rtl" : "ltr",
                                                }}
                                                InputLabelProps={{
                                                    ...params.InputLabelProps,
                                                    style: { color: "white" },
                                                }}
                                                className="bg-gray-50 border border-gray-300 text-white text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 md:p-2.5"
                                                placeholder={`${t('Enter')}/${t('Country of Sale')}`}
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
                                </div>
                            </div>


                            <div className="flex flex-col sm:gap-8 gap-3 sm:flex-row sm:justify-between mt-4">
                                <div className="w-full font-body sm:text-base text-sm flex flex-col gap-0">
                                    <label htmlFor="field9" className={`text-secondary ${i18n.language === 'ar' ? 'text-right' : 'text-left'}`}>{t("Mo Name")}</label>
                                    <Autocomplete
                                        id="field9"
                                        disabled={true}
                                        options={packageType}
                                        getOptionLabel={(option) => option}
                                        onChange={handlePackageType}
                                        value={selectedPackageType}
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
                                                    dir: i18n.language === "ar" ? "rtl" : "ltr",
                                                }}
                                                InputLabelProps={{
                                                    ...params.InputLabelProps,
                                                    style: { color: "white" },
                                                }}
                                                className="bg-gray-50 border border-gray-300 text-white text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 md:p-2.5"
                                                placeholder={`${t('Enter')}/${t('Package Type')}`}
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
                                </div>


                                <div className="w-full font-body sm:text-base text-sm flex flex-col gap-0">
                                    <label htmlFor="field10" className={`text-secondary ${i18n.language === 'ar' ? 'text-right' : 'text-left'}`}>GPC</label>
                                    <Autocomplete
                                        id="field10"
                                        disabled={true}
                                        required
                                        options={gpcList}
                                        getOptionLabel={(option) => (option && option?.value) ? option?.value : ''}
                                        onChange={handleGPCAutoCompleteChange}
                                        // value={gpc}
                                        value={gpc ? { label: gpc, value: gpc } : null}
                                        onInputChange={(event, newInputValue, params) => handleAutoCompleteInputChange(event, newInputValue, params)}
                                        loading={autocompleteLoading}
                                        // sx={{ marginTop: '10px' }}
                                        open={open}
                                        onOpen={() => {
                                            // setOpen(true);
                                        }}
                                        onClose={() => {
                                            setOpen(false);
                                        }}
                                        renderOption={(props, option) => (
                                            <li {...props}>
                                                {option ? `${option?.value}` : 'No options'}
                                            </li>
                                        )}

                                        renderInput={(params) => (
                                            <TextField
                                                // required
                                                {...params}
                                                label="Search GPC here"
                                                InputProps={{
                                                    ...params.InputProps,
                                                    dir: i18n.language === "ar" ? "rtl" : "ltr",
                                                    endAdornment: (
                                                        <React.Fragment>
                                                            {autocompleteLoading ? <CircularProgress color="inherit" size={20} /> : null}
                                                            {params.InputProps.endAdornment}
                                                        </React.Fragment>
                                                    ),
                                                }}
                                                sx={{
                                                    '& label.Mui-focused': {
                                                        color: '#00006A',
                                                    },
                                                    '& .MuiInput-underline:after': {
                                                        borderBottomColor: '#00006A',
                                                    },
                                                    '& .MuiOutlinedInput-root': {
                                                        '&:hover fieldset': {
                                                            borderColor: '#000000',
                                                        },
                                                        '&.Mui-focused fieldset': {
                                                            borderColor: '#000000',
                                                        },
                                                    },
                                                }}
                                            />
                                        )}

                                    />

                                </div>

                            </div>


                            <div className="flex flex-col sm:gap-8 gap-3 sm:flex-row sm:justify-between mt-4">
                                <div className="w-full font-body sm:text-base text-sm flex flex-col gap-0">
                                    <label htmlFor="field12" className={`text-secondary ${i18n.language === 'ar' ? 'text-right' : 'text-left'}`}>{t("Gpc Code")}</label>
                                    <input
                                        type="text"
                                        disabled={true}
                                        onChange={(e) => setGpcCode(e.target.value)}
                                        value={gpcCode}
                                        className={`border-1 w-full rounded-sm border-[#8E9CAB] p-2 ${i18n.language === 'ar' ? ' text-right' : 'text-left'}`}
                                        id="field12"
                                    />
                                </div>

                                <div className="w-full font-body sm:text-base text-sm flex flex-col gap-0">
                                    <label htmlFor="field13" className={`text-secondary ${i18n.language === 'ar' ? 'text-right' : 'text-left'}`}>{t("Company Id")}</label>
                                    <input
                                        type="text"
                                        disabled={true}
                                        onChange={(e) => setCompanyId(e.target.value)}
                                        value={companyId}
                                        className={`border-1 w-full rounded-sm border-[#8E9CAB] p-2 ${i18n.language === 'ar' ? ' text-right' : 'text-left'}`}
                                        id="field13"
                                    />
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};
export default ViewForeignGtin;