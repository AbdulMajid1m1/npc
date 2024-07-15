import React, { useContext, useEffect } from 'react'
import gtrackIcon from "../../../../Images/gtrackicons.png"
import { useState } from 'react';
import { SnackbarContext } from '../../../../Contexts/SnackbarContext';
import { toast } from 'react-toastify';
import newRequest from '../../../../utils/userRequest';
import { CircularProgress } from "@mui/material";
import { useTranslation } from "react-i18next";

const DigitalLinkTab = ({ barcodeData }) => {
  const { t, i18n } = useTranslation();
    const [selectedOption, setSelectedOption] = useState("Safety-Information");
    const [safetyInformation, setSafetyInformation] = useState([]);
    const [recipe, setRecipe] = useState([]);
    const [productContent, setProductContent] = useState([]);
    const [promotionalOffers, setPromotionalOffers] = useState([]);
    const [productLocationofOrigin, setProductLocationofOrigin] = useState([]);
    const [productRecall, setProductRecall] = useState([]);
    const [packagingComposition, setPackagingComposition] = useState([]);
    const [electronicLeaflets, setElectronicLeaflets] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { openSnackbar } = useContext(SnackbarContext);

    // console.log(barcodeData)
   // Digital Link Tab
   const handleOptionChange = (option) => {
    setSelectedOption(option);
    setIsLoading(true);

    // Make the API call
    newRequest.get(`/digitalLinks?identificationKeyType=gtin&identificationKey=${barcodeData}`)
      .then((response) => {
        console.log(response?.data?.data[0]?.responses);
        switch (option) {
          case "Safety-Information":
            setSafetyInformation(response?.data?.data[0]?.responses?.filter(item => item?.linkType === 'gs1:productSustainabilityInfo') || []);
            if (response?.data?.count === 0) {
              toast.warning("No data found for this Gtin");
            }
            break;
          case "Promotional-Offers":
            setPromotionalOffers(response?.data?.data[0]?.responses?.filter(item => item.linkType === 'gs1:hasRetailers') || []);
            if (response?.data?.count === 0) {
              toast.warning("No data found for this Gtin");
            }
            break;
          case "Product-Contents":
            setProductContent(response?.data?.data[0]?.responses?.filter(item => item.linkType === 'gs1:pip') || []); 
            if (response?.data?.count === 0) {
              toast.warning("No data found for this Gtin");
            }
            break;
          case "Product-Location":
            setProductLocationofOrigin(response.data);
            if (response?.data?.count === 0) {
              toast.warning("No data found for this Gtin");
            }
            break;
          case "ProductRecall":
            setProductRecall(response?.data?.data[0]?.responses?.filter(item => item.linkType === 'gs1:productSustainabilityInfo') || []);
            if (response?.data?.count === 0) {
              toast.warning("No data found for this Gtin");
            }
            break;
          case "Recipe":
            setRecipe(response?.data?.data[0]?.responses?.filter(item => item.linkType === 'gs1:recipeInfo') || []);
            if (response?.data?.count === 0) {
              toast.warning("No data found for this Gtin");
            }
            break;
          case "Packaging-Composition":
            setPackagingComposition(response?.data?.data[0]?.responses?.filter(item => item.linkType === 'gs1:pip') || []);
            if (response?.data?.count === 0) {
              toast.warning("No data found for this Gtin");
            }
            break;
          case "Electronic-Leaflets":
            setElectronicLeaflets(response?.data?.data[0]?.responses?.filter(item => item.linkType === 'gs1:pip') || []);
            if (response?.data?.count === 0) {
              toast.warning("No data found for this Gtin");
            }
            break;
          default:
            break;
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(err?.response?.data?.error ?? "Something went wrong!");
        // Reset state for the selected option if there's an error
        switch (option) {
          case "Safety-Information":
            setSafetyInformation([]);
            break;
          case "Promotional-Offers":
            setPromotionalOffers([]);
            break;
          case "Product-Contents":
            setProductContent([]);
            break;
          case "Product-Location":
            setProductLocationofOrigin([]);
            break;
          case "ProductRecall":
            setProductRecall([]);
            break;
          case "Recipe":
            setRecipe([]);
            break;
          case "Packaging-Composition":
            setPackagingComposition([]);
            break;
          case "Electronic-Leaflets":
            setElectronicLeaflets([]);
            break;
          default:
            break;
        }
      })
      .finally(() => {
        setIsLoading(false); // Set isLoading to false when API call completes (whether success or failure)
      });
  };


  const renderDataGrid = () => {
    switch (selectedOption) {
      case "Safety-Information":
        return (
          <div className='h-auto w-full mt-3'>

            <div className='flex flex-col gap-2 p-2 border-2 border-dashed'>
                <h1 className='font-normal bg-primary text-white px-2 py-1'>{t("Detailed Information")}</h1>
              {isLoading ? ( 
                <div className="flex justify-center">
                  <CircularProgress />
                </div>
              ) : (
                <React.Fragment>
                  <div className='flex justify-between'>
                    <div className='w-[50%]'>
                      <p className='text-[#4AA9C4]'>{t("Link Title")}</p>
                    </div>
                    <div className='flex w-[50%] overflow-x-auto gap-2'>
                      <p>:</p>
                      <span className='ml-1 text-[#CD8742]'>{safetyInformation?.[0]?.linkTitle}</span>
                    </div>
                  </div>

                  <div className='flex justify-between'>
                    <div className='w-[50%]'>
                      <p className='text-[#4AA9C4]'>{t("Link Type")}</p>
                    </div>
                    <div className='flex w-[50%] overflow-x-auto gap-2'>
                      <p>:</p>
                      <span className='ml-1 text-[#CD8742]'>{safetyInformation?.[0]?.linkType}</span>
                    </div>
                  </div>

                  <div className='flex justify-between'>
                    <div className='w-[50%]'>
                      <p className='text-[#4AA9C4]'>{t("Language")}</p>
                    </div>
                    <div className='flex w-[50%] overflow-x-auto gap-2'>
                      <p>:</p>
                      <span className='ml-1 text-[#CD8742]'>{safetyInformation?.[0]?.language}</span>
                    </div>
                  </div>

                  <div className='flex justify-between'>
                    <div className='w-[50%]'>
                      <p className='text-[#4AA9C4]'>{t("Target URL")}</p>
                    </div>
                    <div className='flex w-[50%] overflow-x-auto gap-2'>
                      <p>:</p>
                      <a className='ml-1 text-[#476ae8] hover:text-[#CD8742]' href={safetyInformation?.[0]?.targetUrl} target='_blank'>{safetyInformation?.[0]?.targetUrl}</a>
                    </div>
                  </div>

                  <div className='flex justify-between'>
                    <div className='w-[50%]'>
                      <p className='text-[#4AA9C4]'>{t("Mime Type")}</p>
                    </div>
                    <div className='flex w-[50%] overflow-x-auto gap-2'>
                      <p>:</p>
                      <span className='ml-1 text-[#CD8742]'>{safetyInformation?.[0]?.mimeType}</span>
                    </div>
                  </div>
                </React.Fragment>
              )}
            </div>

          </div>
        );

      case "Promotional-Offers":
        return (
          <div className='h-auto w-full mt-3'>
            <div className='flex flex-col gap-2 p-2 border-2 border-dashed'>
                <h1 className='font-normal bg-primary text-white px-2 py-1'>{t("Detailed Information")}</h1>
                {isLoading ? ( 
                  <div className="flex justify-center">
                    <CircularProgress />
                  </div>
                ) : (
                  <React.Fragment>
                  <div className='flex justify-between'>
                      <div className='w-[50%]'>
                          <p className='text-[#4AA9C4]'>{t("Link Title")}</p>
                      </div>
                      <div className='flex w-[50%] overflow-x-auto gap-2'>
                        <p>:</p>
                          <span className='ml-1 text-[#CD8742]'>{promotionalOffers?.[0]?.linkTitle}</span>
                          {/* <span className='ml-1 text-[#CD8742]'>Promotional Offers</span> */}
                      </div>
                  </div>
               
                  <div className='flex justify-between'>
                      <div className='w-[50%]'>
                          <p className='text-[#4AA9C4]'>{t("Link Type")}</p>
                      </div>
                      <div className='flex w-[50%] overflow-x-auto gap-2'>
                        <p>:</p>
                        < span className='ml-1 text-[#CD8742]'>{promotionalOffers?.[0]?.linkType}</span>
                      </div>
                  </div>

                  <div className='flex justify-between'>
                      <div className='w-[50%]'>
                          <p className='text-[#4AA9C4]'>{t("Language")}</p>
                      </div>
                      <div className='flex w-[50%] overflow-x-auto gap-2'>
                        <p>:</p>
                        < span className='ml-1 text-[#CD8742]'>{promotionalOffers?.[0]?.language}</span>
                      </div>
                  </div>

                  <div className='flex justify-between'>
                      <div className='w-[50%]'>
                          <p className='text-[#4AA9C4]'>{t("Target URL")}</p>
                      </div>
                      <div className='flex w-[50%] overflow-x-auto gap-2'>
                        <p>:</p>
                          <a className='ml-1 text-[#476ae8] hover:text-[#CD8742]' href={promotionalOffers?.[0]?.targetUrl}>{promotionalOffers?.[0]?.targetUrl}</a>
                      </div>
                  </div>

                  <div className='flex justify-between'>
                      <div className='w-[50%]'>
                          <p className='text-[#4AA9C4]'>{t("Mime Type")}</p>
                      </div>
                      <div className='flex w-[50%] overflow-x-auto gap-2'>
                        <p>:</p>
                          <span className='ml-1 text-[#CD8742]'>{promotionalOffers?.[0]?.mimeType}</span>
                      </div>
                  </div>
                </React.Fragment>
              )}
            </div>

          </div>
        );

      case "Product-Contents":
        return (
          <div className='h-auto w-full mt-3'>
            <div className='flex flex-col gap-2 p-2 border-2 border-dashed'>
              <h1 className='font-normal bg-primary text-white px-2 py-1'>{t("Detailed Information")}</h1>
              {isLoading ? ( 
                <div className="flex justify-center">
                  <CircularProgress />
                </div>
              ) : (
              <React.Fragment>
              <div className='flex justify-between'>
                <div className='w-[50%]'>
                  <p className='text-[#4AA9C4]'>{t("Link Title")}</p>
                </div>
                <div className='flex w-[50%] overflow-x-auto gap-2'>
                  <p>:</p>
                  <span className='ml-1 text-[#CD8742]'>{productContent[0]?.linkTitle}</span>
                </div>
              </div>

              <div className='flex justify-between'>
                <div className='w-[50%]'>
                  <p className='text-[#4AA9C4]'>{t("Link Type")}</p>
                </div>
                <div className='flex w-[50%] overflow-x-auto gap-2'>
                  <p>:</p>
                  <span className='ml-1 text-[#CD8742]'>{productContent[0]?.linkType}</span>
                </div>
              </div>

              <div className='flex justify-between'>
                <div className='w-[50%]'>
                  <p className='text-[#4AA9C4]'>{t("Mime Type")}</p>
                </div>
                <div className='flex w-[50%] overflow-x-auto gap-2'>
                  <p>:</p>
                  <span className='ml-1 text-[#CD8742]'>{productContent[0]?.mimeType}</span>
                </div>
              </div>

              <div className='flex justify-between'>
                <div className='w-[50%]'>
                  <p className='text-[#4AA9C4]'>{t("Language")}</p>
                </div>
                <div className='flex w-[50%] overflow-x-auto gap-2'>
                  <p>:</p>
                  <span className='ml-1 text-[#CD8742]'>{productContent[0]?.language}</span>
                </div>
              </div>

              <div className='flex justify-between'>
                <div className='w-[50%]'>
                  <p className='text-[#4AA9C4]'>{t("Target Url")}</p>
                </div>
                <div className='flex w-[50%] overflow-x-auto gap-2'>
                  <p>:</p>
                  <a className='ml-1 text-[#476ae8] hover:text-[#CD8742]' href={productContent[0]?.targetUrl} target='_blank'>{productContent[0]?.targetUrl}</a>
                </div>
              </div>
              </React.Fragment>
              )}
            </div>
          </div>
        );

      case "Product-Location":
        return (
          <div className='h-auto w-full mt-3'>
            <div className='flex flex-col gap-2 p-2 border-2 border-dashed'>
              <h1 className='font-normal bg-primary text-white px-2 py-1'>{t("Detailed Information")}</h1>
              {isLoading ? ( 
                <div className="flex justify-center">
                  <CircularProgress />
                </div>
              ) : (
              <React.Fragment>
              <div className='flex justify-between'>
                      <div className='w-[50%]'>
                          <p className='text-[#4AA9C4]'>{t("Product Location Origin")}</p>
                      </div>
                      <div className='flex w-[50%] overflow-x-auto gap-2'>
                        <p>:</p>
                        <span className='ml-1 text-[#CD8742]'>{productLocationofOrigin?.[0]?.ProductLocationOrigin}</span>
                      </div>
              </div>

              <div className='flex justify-between'>
                  <div className='w-[50%]'>
                    <p className='text-[#4AA9C4]'>{t("Link Type")}</p>
                  </div>
                  <div className='flex w-[50%] overflow-x-auto gap-2'>
                    <p>:</p>
                    <span className='ml-1 text-[#CD8742]'>{productLocationofOrigin?.[0]?.LinkType}</span>
                  </div>
              </div>

              <div className='flex justify-between'>
                  <div className='w-[50%]'>
                    <p className='text-[#4AA9C4]'>{t("Ingredients")}</p>
                  </div>
                  <div className='flex w-[50%] overflow-x-auto gap-2'>
                    <p>:</p>
                    <span className='ml-1 text-[#CD8742]'>{productLocationofOrigin?.[0]?.GTIN}</span>
                  </div>
              </div>

              <div className='flex justify-between'>
                  <div className='w-[50%]'>
                    <p className='text-[#4AA9C4]'>{t("Manufacturing Date")}</p>
                  </div>
                  <div className='flex w-[50%] overflow-x-auto gap-2'>
                    <p>:</p>
                    <span className='ml-1 text-[#CD8742]'>{productLocationofOrigin?.[0]?.ExpiryDate}</span>
                  </div>
              </div>
              </React.Fragment>
              )}
            </div>
          </div>
        );

      case "Product-Recall":
        return (
          <div className='h-auto w-full mt-3'>
            <div className='flex flex-col gap-2 p-2 border-2 border-dashed'>
                {/* <h1 className='text-center font-semibold bg-yellow-100'>Product Recall RECORD</h1> */}
                <h1 className='font-normal bg-primary text-white px-2 py-1'>{t("Detailed Information")}</h1>
                {isLoading ? ( 
                  <div className="flex justify-center">
                    <CircularProgress />
                  </div>
                ) : (
                <React.Fragment>
                <div className='flex justify-between'>
                    <div className='w-[50%]'>
                        <p className='text-[#4AA9C4]'>{t("Link Title")}</p>
                    </div>
                    <div className='flex w-[50%] overflow-x-auto gap-2'>
                      <p>:</p>
                      <span className='ml-1 text-[#CD8742]'>{safetyInformation?.[0]?.linkTitle}</span>
                    </div>
                </div>
                  <div className='flex justify-between'>
                      <div className='w-[50%]'>
                          <p className='text-[#4AA9C4]'>{t("Link Type")}</p>
                      </div>
                      <div className='flex w-[50%] overflow-x-auto gap-2'>
                        <p>:</p>
                          <a className='ml-1 text-[#CD8742]'>{safetyInformation?.[0]?.linkType}</a>
                      </div>
                  </div>

                  <div className='flex justify-between'>
                      <div className='w-[50%]'>
                          <p className='text-[#4AA9C4]'>{t("Language")}</p>
                      </div>
                      <div className='flex w-[50%] overflow-x-auto gap-2'>
                        <p>:</p>
                          <a className='ml-1 text-[#CD8742]'>{safetyInformation?.[0]?.language}</a>
                      </div>
                  </div>

                  <div className='flex justify-between'>
                      <div className='w-[50%]'>
                          <p className='text-[#4AA9C4]'>{t("Target URL")}</p>
                      </div>
                      <div className='flex w-[50%] overflow-x-auto gap-2'>
                        <p>:</p>
                        <a className='ml-1 text-[#476ae8] hover:text-[#CD8742]' href={safetyInformation?.[0]?.targetUrl} target='_blank'>{safetyInformation?.[0]?.targetUrl}</a>
                      </div>
                  </div>

                  <div className='flex justify-between'>
                      <div className='w-[50%]'>
                          <p className='text-[#4AA9C4]'>{t("Mime Type")}</p>
                      </div>
                      <div className='flex w-[50%] overflow-x-auto gap-2'>
                        <p>:</p>
                          <span className='ml-1 text-[#CD8742]'>{safetyInformation?.[0]?.mimeType}</span>
                      </div>
                  </div>
                </React.Fragment>
              )}
            </div>
          </div>
        );

      case "Recipe":
        return (
          <div className='h-auto w-full mt-3'>
            <div className='flex flex-col gap-2 p-2 border-2 border-dashed'>
              <h1 className='font-normal bg-primary text-white px-2 py-1'>{t("Detailed Information")}</h1>
              {isLoading ? ( 
                  <div className="flex justify-center">
                    <CircularProgress />
                  </div>
                ) : (
                <React.Fragment>
                <div className='flex justify-between'>
                  <div className='w-[50%]'>
                    <p className='text-[#4AA9C4]'>{t("Link Title")}</p>
                  </div>
                  <div className='flex w-[50%] overflow-x-auto gap-2'>
                    <p>:</p>
                    <span className='ml-1 text-[#CD8742]'>{recipe[0]?.linkTitle}</span>
                  </div>
                </div>

                <div className='flex justify-between'>
                  <div className='w-[50%]'>
                    <p className='text-[#4AA9C4]'>{t("Link Type")}</p>
                  </div>
                  <div className='flex w-[50%] overflow-x-auto gap-2'>
                    <p>:</p>
                    <span className='ml-1 text-[#CD8742]'>{recipe?.[0]?.linkType}</span>
                  </div>
                </div>

                {/* <div>
                    <p className='text-base'>Ingredients: <span className='font-semibold ml-1'>{recipe?.[0]?.ingredients}</span></p>
                </div> */}
                <div className='flex justify-between'>
                  <div className='w-[50%]'>
                    <p className='text-[#4AA9C4]'>{t("Mime Type")}</p>
                  </div>
                  <div className='flex w-[50%] overflow-x-auto gap-2'>
                    <p>:</p>
                    <span className='ml-1 text-[#CD8742]'>{recipe?.[0]?.mimeType}</span>
                  </div>
                </div>

                <div className='flex justify-between'>
                  <div className='w-[50%]'>
                    <p className='text-[#4AA9C4]'>{t("language")}</p>
                  </div>
                  <div className='flex w-[50%] overflow-x-auto gap-2'>
                    <p>:</p>
                    <span className='ml-1 text-[#CD8742]'>{recipe?.[0]?.language}</span>
                  </div>
                </div>

                {/* <div>
                    <p className='text-base'>Link Type: <span className='font-semibold ml-1'>{recipe?.[0]?.LinkType}</span></p>
                </div> */}
                <div className='flex justify-between'>
                  <div className='w-[50%]'>
                    <p className='text-[#4AA9C4]'>{t("Target Url")}</p>
                  </div>
                  <div className='flex w-[50%] overflow-x-auto gap-2'>
                    <p>:</p>
                    <a className='ml-1 text-[#476ae8] hover:text-[#CD8742]' href={recipe?.[0]?.targetUrl} target='_blank'>{recipe?.[0]?.targetUrl}</a>
                  </div>
                </div>
                </React.Fragment>
              )}
            </div>
          </div>
        );

      case "Packaging-Composition":
        return (
          <div className='h-auto w-full mt-3'>
            <div className='flex flex-col gap-2 p-2 border-2 border-dashed'>
                <h1 className='font-normal bg-primary text-white px-2 py-1'>{t("Detailed Information")}</h1>
                {isLoading ? ( 
                  <div className="flex justify-center">
                    <CircularProgress />
                  </div>
                ) : (
                <React.Fragment>
                <div className='flex justify-between'>
                  <div className='w-[50%]'>
                    <p className='text-[#4AA9C4]'>{t("Link Title")}</p>
                  </div>
                  <div className='flex w-[50%] overflow-x-auto gap-2'>
                    <p>:</p>
                    <span className='ml-1 text-[#CD8742]'>{packagingComposition?.[0]?.linkTitle}</span>
                  </div>
                </div>
               

                <div className='flex justify-between'>
                  <div className='w-[50%]'>
                    <p className='text-[#4AA9C4]'>{t("Link Type")}</p>
                  </div>
                  <div className='flex w-[50%] overflow-x-auto gap-2'>
                    <p>:</p>
                    <span className='ml-1 text-[#CD8742]'>{packagingComposition?.[0]?.linkType}</span>
                  </div>
                </div>

                <div className='flex justify-between'>
                  <div className='w-[50%]'>
                    <p className='text-[#4AA9C4]'>{t("Mime Type")}</p>
                  </div>
                  <div className='flex w-[50%] overflow-x-auto gap-2'>
                    <p>:</p>
                    <span className='ml-1 text-[#CD8742]'>{packagingComposition?.[0]?.mimeType}</span>
                  </div>
                </div>

                <div className='flex justify-between'>
                  <div className='w-[50%]'>
                    <p className='text-[#4AA9C4]'>{t("Language")}</p>
                  </div>
                  <div className='flex w-[50%] overflow-x-auto gap-2'>
                    <p>:</p>
                    <span className='ml-1 text-[#CD8742]'>{packagingComposition?.[0]?.language}</span>
                  </div>
                </div>

                {/* <div>
                    <p className='text-base'>Material: <span className='font-semibold ml-1'>{packagingComposition?.[0]?.material}</span></p>
                </div> */}
                <div className='flex justify-between'>
                  <div className='w-[50%]'>
                    <p className='text-[#4AA9C4]'>{t("Target Url")}</p>
                  </div>
                  <div className='flex w-[50%] overflow-x-auto gap-2'>
                    <p>:</p>
                    <a className='ml-1 text-[#476ae8] hover:text-[#CD8742]' href={packagingComposition?.[0]?.targetUrl} target='_blank'>{packagingComposition?.[0]?.targetUrl}</a>
                  </div>
                </div>
                </React.Fragment>
              )}
              </div>
          </div>
        );

      case "Electronic-Leaflets":
        return (
          <div className='h-auto w-full mt-3'>
            <div className='flex flex-col gap-2 p-2 border-2 border-dashed'>
                <h1 className='font-normal bg-primary text-white px-2 py-1'>{t("Detailed Information")}</h1>
                {isLoading ? ( 
                  <div className="flex justify-center">
                    <CircularProgress />
                  </div>
                ) : (
                <React.Fragment>
                <div className='flex justify-between'>
                  <div className='w-[50%]'>
                    <p className='text-[#4AA9C4]'>{t("Link Title")}</p>
                  </div>
                  <div className='flex w-[50%] overflow-x-auto gap-2'>
                    <p>:</p>
                    <span className='ml-1 text-[#CD8742]'>{electronicLeaflets?.[0]?.linkTitle}</span>
                  </div>
                </div>
               

                <div className='flex justify-between'>
                  <div className='w-[50%]'>
                    <p className='text-[#4AA9C4]'>{t("Link Type")}</p>
                  </div>
                  <div className='flex w-[50%] overflow-x-auto gap-2'>
                    <p>:</p>
                    <span className='ml-1 text-[#CD8742]'>{electronicLeaflets?.[0]?.linkType}</span>
                  </div>
                </div>

                <div className='flex justify-between'>
                  <div className='w-[50%]'>
                    <p className='text-[#4AA9C4]'>{t("Mime Type")}</p>
                  </div>
                  <div className='flex w-[50%] overflow-x-auto gap-2'>
                    <p>:</p>
                    <span className='ml-1 text-[#CD8742]'>{electronicLeaflets?.[0]?.mimeType}</span>
                  </div>
                </div>

                <div className='flex justify-between'>
                  <div className='w-[50%]'>
                    <p className='text-[#4AA9C4]'>{t("Language")}</p>
                  </div>
                  <div className='flex w-[50%] overflow-x-auto gap-2'>
                    <p>:</p>
                    <span className='ml-1 text-[#CD8742]'>{electronicLeaflets?.[0]?.language}</span>
                  </div>
                </div>

                {/* <div>
                    <p className='text-base'>Material: <span className='font-semibold ml-1'>{packagingComposition?.[0]?.material}</span></p>
                </div> */}
                <div className='flex justify-between'>
                  <div className='w-[50%]'>
                    <p className='text-[#4AA9C4]'>{t("Target Url")}</p>
                  </div>
                  <div className='flex w-[50%] overflow-x-auto gap-2'>
                    <p>:</p>
                    <a className='ml-1 text-[#476ae8] hover:text-[#CD8742]' href={electronicLeaflets?.[0]?.targetUrl} target='_blank'>{electronicLeaflets?.[0]?.targetUrl}</a>
                  </div>
                </div>
                </React.Fragment>
              )}
              </div>
          </div>
        );
      // Add more cases for other options
      default:
        return null;
    }
  };


  return (
    <div
      className={`flex justify-between gap-2 w-full mb-2 px-2 ${
        i18n.language === "ar" ? "flex-row-reverse" : "flex-row"
      }`}
    >
      <div className="w-[25%] flex flex-col gap-2 mt-3">
        <span
          className={`bg-secondary py-2 flex justify-start px-1 rounded-md text-white items-center gap-2 cursor-pointer 
                }`}
          onClick={() => handleOptionChange("Safety-Information")}
        >
          <img src={gtrackIcon} className="w-5 h-5 ml-1" alt="" />
          {t("Safety Information")}
        </span>

        <span
          className={`bg-secondary py-2 flex justify-start px-1 rounded-md text-white items-center gap-2 cursor-pointer ${
            selectedOption === "Promotional-Offers" ? "bg-yellow-500" : ""
          }`}
          onClick={() => handleOptionChange("Promotional-Offers")}
        >
          <img src={gtrackIcon} className="w-5 h-5 ml-1" alt="" />
          {t("Promotional Offers")}
        </span>

        <span
          className={`bg-primary py-2 flex justify-start px-1 rounded-md text-white items-center gap-2 cursor-pointer ${
            selectedOption === "Product-Contents" ? "bg-yellow-500" : ""
          }`}
          onClick={() => handleOptionChange("Product-Contents")}
        >
          <img src={gtrackIcon} className="w-5 h-5 ml-1" alt="" />
          {t("Product Contents")}
        </span>

        <span
          className={`bg-primary py-2 flex justify-start px-1 rounded-md text-white items-center gap-2 cursor-pointer ${
            selectedOption === "Product-Location" ? "bg-yellow-500" : ""
          }`}
          onClick={() => handleOptionChange("Product-Location")}
        >
          <img src={gtrackIcon} className="w-5 h-5 ml-1" alt="" />
          {t("Product Location of Origin")}
        </span>

        <span
          className={`bg-secondary py-2 flex justify-start px-1 rounded-md text-white items-center gap-2 cursor-pointer ${
            selectedOption === "Product-Recall" ? "bg-yellow-500" : ""
          }`}
          onClick={() => handleOptionChange("Product-Recall")}
        >
          <img src={gtrackIcon} className="w-5 h-5 ml-1" alt="" />
          {t("Product Recall")}
        </span>

        <span
          className={`bg-secondary py-2 flex justify-start px-1 rounded-md text-white items-center gap-2 cursor-pointer ${
            selectedOption === "Recipe" ? "bg-yellow-500" : ""
          }`}
          onClick={() => handleOptionChange("Recipe")}
        >
          <img src={gtrackIcon} className="w-5 h-5 ml-1" alt="" />
          {t("Recipe")}
        </span>

        <span
          className={`bg-primary py-2 flex justify-start px-1 rounded-md text-white items-center gap-2 cursor-pointer ${
            selectedOption === "Packaging-Composition" ? "bg-yellow-500" : ""
          }`}
          onClick={() => handleOptionChange("Packaging-Composition")}
        >
          <img src={gtrackIcon} className="w-5 h-5 ml-1" alt="" />
          {t("Packaging Composition")}
        </span>

        <span
          className={`bg-primary py-2 flex justify-start px-1 rounded-md text-white items-center gap-2 cursor-pointer ${
            selectedOption === "Electronic-Leaflets" ? "bg-yellow-500" : ""
          }`}
          onClick={() => handleOptionChange("Electronic-Leaflets")}
        >
          <img src={gtrackIcon} className="w-5 h-5 ml-1" alt="" />
          {t("Electronic Leaflets")}
        </span>
      </div>

      {/* All Datagird Display on the right side */}
      <div className="sm:w-[75%] w-full">{renderDataGrid()}</div>
    </div>
  );
}

export default DigitalLinkTab