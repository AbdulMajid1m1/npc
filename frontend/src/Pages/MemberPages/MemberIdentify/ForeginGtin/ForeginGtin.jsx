import React, { useContext, useEffect, useState } from "react";
import DataTable from "../../../../components/Datatable/Datatable";
import { foreignGtinColumn } from "../../../../utils/datatablesource";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import { DataTableContext } from "../../../../Contexts/DataTableContext";
import newRequest from "../../../../utils/userRequest";
import { toast } from "react-toastify";
import { useTranslation } from 'react-i18next';
import DashboardRightHeader from "../../../../components/DashboardRightHeader/DashboardRightHeader";
import { useLanguage } from "../../../../Contexts/LanguageContext";

const ForeginGtin = () => {
  const [data, setData] = useState([]);
  const { t, i18n } = useTranslation();
  const { selectedLanguage } = useLanguage();
  const memberDataString = sessionStorage.getItem('memberData');
  const memberData = JSON.parse(memberDataString);
  // console.log(memberData);
  const { rowSelectionModel, setRowSelectionModel,
    tableSelectedRows, setTableSelectedRows, tableSelectedExportRows, setTableSelectedExportRows } = useContext(DataTableContext);

  const [isLoading, setIsLoading] = useState(true);
  const [filteredData, setFilteredData] = useState([]); // for the map markers
  const [totalCategory, setTotalCategory] = useState("");
  const navigate = useNavigate()

  const fetchData = async () => {
    try {
      // const response = await newRequest.get(`/foreignGtin`);
      const response = await newRequest.get(`/foreignGtin?companyId=${memberData?.companyID}`);
      console.log(response.data);
      setData(response?.data || []);
      setIsLoading(false)

    } catch (err) {
      console.log(err);
      setIsLoading(false)
    }
  };



  const fetchGtinProducts = async () => {
    try {
      const response = await newRequest.get(`/gtinProducts/subcriptionsProducts?status=active&user_id=${memberData?.id}&isDeleted=false`);
      console.log(response.data);

      //  setGtinSubscriptions(response?.data?.gtinSubscriptions);
      setTotalCategory(response?.data?.gtinSubscriptions[0]?.gtin_product?.member_category_description);
      console.log(response?.data?.gtinSubscriptions[0]?.gtin_product?.member_category_description);
      console.log(totalCategory)



    } catch (err) {
      console.log(err);
    }
  }


  useEffect(() => {
    fetchData(); // Calling the function within useEffect, not inside itself
    fetchGtinProducts();
  }, []); // Empty array dependency ensures this useEffect runs once on component mount


  const handleView = (row) => {
    // console.log(row);
    navigate("/member/view-foregin-gtin/" + row?.id);
    sessionStorage.setItem("selectedProductData", JSON.stringify(row));
  };

  const handleDigitalUrlInfo = (row) => {
    sessionStorage.setItem("selectedProductData", JSON.stringify(row));
    navigate("/member/foreign-digital-link")
  }

  const handleDelete = async (row) => {
    try {
      const deleteResponse = await newRequest.delete(`/foreignGtin/${row?.id}`);
      console.log(deleteResponse.data);
      toast.success(`${t('The product has been deleted successfully')}`);

      // Update the datagrid Table after deletion
      setData(prevData => prevData.filter(item => item.id !== row?.id));

    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.error || 'Error');
    }
  };



  const handleExportProducts = () => {
    if (!tableSelectedExportRows || tableSelectedExportRows.length === 0) {
      toast.error(`${t('Please select at least one row for export')}!`);
      return;
    }

    // Convert data to Excel format
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(tableSelectedExportRows);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Selected Rows');

    // Generate Excel file
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const dataBlob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    // Save Excel file
    saveAs(dataBlob, 'foreign_gtin.xlsx');

    // Print data of selected rows
    console.log('Selected Rows Data:', tableSelectedExportRows);

    setTableSelectedExportRows([]);
    setRowSelectionModel([]);
  };


  const handleExportProductsTemplate = () => {
    // Mapping of original headers to desired headers
    const headerMapping = {
      productnameenglish: 'ProductNameEnglish',
      productnamearabic: 'ProductNameArabic',
      BrandName: 'BrandName',
      BrandNameAr: 'BrandNameAr',
      ProductType: 'ProductType',
      Origin: 'Country Of Origin',
      countrySale: 'Country of Sale',
      PackagingType: 'PackagingType',
      MnfCode: 'MnfCode',
      MnfGLN: 'MnfGLN',
      ProvGLN: 'ProvGLN',
      gpc_code: 'GPC Code',
      prod_lang: 'Product Language Code',
      details_page: 'DetailsPage',
      unit: 'UOM',
      size: 'Size',
      barcode: 'GTIN'
    };

    // Create a new array with the desired headers in the specified order
    const desiredHeaders = Object.values(headerMapping);

    // Create a worksheet with only headers
    const headerWorksheet = XLSX.utils.json_to_sheet([{}], { header: desiredHeaders });

    // Create a workbook and append the header worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, headerWorksheet, 'Header Only');

    // Generate Excel file
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const dataBlob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    // Save Excel file
    saveAs(dataBlob, 'foreign_gtin_template.xlsx');
  };



  const handleFileInputChange = (event) => {
    const selectedFile = event.target.files[0];
    setIsLoading(true);

    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('user_id', memberData?.id);
      formData.append('email', memberData?.email);

      newRequest.post('/products/bulkGtin?selectedLanguage=' + selectedLanguage, formData)
        .then((response) => {
          // Handle the successful response
          console.log(response.data);

          if (response.data && response.data.errors && response.data.errors.length > 0) {
            // Display a generic error message
            toast.error(response.data.errors[0].error);
          }
          else {
            // Display a generic success message
            toast.success(response?.data?.message || `${t('The data has been imported successfully')}`);
          }

          setIsLoading(false);
          // Clear the file input value
          event.target.value = '';

          fetchData();
        })
        .catch((error) => {
          // Handle the error
          console.error(error);
          toast.error(error?.response?.data?.error || `${t('Something is Wrong')}`);
          // Clear the file input value
          event.target.value = '';
          setIsLoading(false);
        });
    }
  };


  const handleRowClickInParent = (item) => {
    if (!item || item?.length === 0) {
      // setTableSelectedRows(data)
      setTableSelectedExportRows(item)
      setFilteredData(data)
      return
    }

    const barcodes = item.map((row) => row.barcode);
    console.log(barcodes); // This will log an array of barcodes
    setTableSelectedRows(barcodes);
  }



  return (
    <div>
      <div className={`p-0 h-full ${i18n.language === 'ar' ? 'sm:mr-72' : 'sm:ml-72'}`}>
        <div>
          <DashboardRightHeader title={`${t('Foreign GTIN')}`} />
        </div>

        <div className='flex justify-center items-center'>
          <div className="h-auto w-[97%] px-0 py-4">
            <div className="h-auto w-full p-0 bg-white shadow-xl rounded-md">

              <div className={`flex justify-center sm:justify-start items-center flex-wrap gap-2 py-7 px-3 ${i18n.language === 'ar' ? 'flex-row-reverse justify-start' : 'flex-row justify-start'}`}>
                <button
                  onClick={() => navigate('/member/member-add-foreign')}
                  className="rounded-full bg-primary font-body px-5 py-1 text-sm mb-3 text-white transition duration-200 hover:bg-secondary">
                  {i18n.language === 'ar' ? (
                    <>
                      {t('Add Foreign GTIN')} <i className="fas fa-plus mr-1"></i>
                    </>
                  ) : (
                    <>
                      <i className="fas fa-plus mr-1"></i>  {t('Add Foreign GTIN')}
                    </>
                  )}
                </button>


                <button
                  className="rounded-full bg-[#1E3B8B] font-body px-5 py-1 text-sm mb-3 text-white transition duration-200 hover:bg-primary"
                  onClick={handleExportProducts}
                >
                  {i18n.language === 'ar' ? (
                    <>
                      <i className="fas fa-caret-down ml-1"></i> {t('Export in Excel')}
                    </>
                  ) : (
                    <>
                      {t('Export in Excel')}   <i className="fas fa-caret-down ml-1"></i>
                    </>
                  )}
                </button>


                <div>
                  <input
                    type="file"
                    style={{ display: 'none' }}
                    onChange={handleFileInputChange}
                  />
                  <button
                    className="rounded-full bg-primary font-body px-5 py-1 text-sm mb-3 text-white transition duration-200 hover:bg-secondary"
                    onClick={() => document.querySelector('input[type="file"]').click()}
                  >
                    {i18n.language === 'ar' ? (
                      <>
                        {t('Import')}  <i className="fas fa-file-import mr-1"></i>
                      </>
                    ) : (
                      <>
                        <i className="fas fa-file-import mr-1"></i>  {t('Import')}
                      </>
                    )}
                  </button>
                </div>

                <button
                  onClick={handleExportProductsTemplate}
                  className="rounded-full bg-[#1E3B8B] font-body px-4 py-1 text-sm mb-3 text-white transition duration-200 hover:bg-primary">
                  {i18n.language === 'ar' ? (
                    <>
                      <i className="fas fa-caret-down ml-1"></i>  {t('Download Template')}
                    </>
                  ) : (
                    <>
                      {t('Download Template')} <i className="fas fa-caret-down ml-1"></i>
                    </>
                  )}
                </button>

                {memberData?.gcpGLNID && (
                  <button
                    className="rounded-full bg-[#1E3B8B] font-body px-5 py-1 text-sm mb-3 text-white transition duration-200 hover:bg-primary">
                    GCP {memberData.gcpGLNID}
                  </button>
                )}
                {totalCategory && (
                  <button
                    className="rounded-full bg-[#1E3B8B] font-body px-5 py-1 text-sm mb-3 text-white transition duration-200 hover:bg-primary">
                    {totalCategory}
                  </button>
                )}
                {memberData?.memberID && (
                  <button
                    className="rounded-full bg-[#1E3B8B] font-body px-5 py-1 text-sm mb-3 text-white transition duration-200 hover:bg-primary">
                    {t('Member ID')} {memberData?.memberID}
                  </button>
                )}
                
              </div>


              <div style={{ marginLeft: '-11px', marginRight: '-11px' }}>

                <DataTable data={data} title={t('Foreign GTIN')} columnsName={foreignGtinColumn(t)}
                  loading={isLoading}
                  secondaryColor="secondary"
                  handleRowClickInParent={handleRowClickInParent}
                  uniqueId="customerListId"

                  dropDownOptions={[
                    {
                      label: `${t('View')}`,
                      icon: (
                        <VisibilityIcon
                          fontSize="small"
                          color="action"
                          style={{ color: "rgb(37 99 235)" }}
                        />
                      ),
                      action: handleView,
                    },
                    // {
                    //   label: `${t('Digital Links')}`,
                    //   icon: (
                    //     <VisibilityIcon
                    //       fontSize="small"
                    //       color="action"
                    //       style={{ color: "rgb(37 99 235)" }}
                    //     />
                    //   ),
                    //   action: handleDigitalUrlInfo,
                    // }
                    // ,
                    {
                      label: `${t('Delete')}`,
                      icon: <DeleteIcon fontSize="small" style={{ color: '#FF0032' }} />
                      ,
                      action: handleDelete,
                    }

                  ]}

                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForeginGtin