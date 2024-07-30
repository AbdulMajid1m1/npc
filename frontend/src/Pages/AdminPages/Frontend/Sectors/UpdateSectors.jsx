import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import newRequest from "../../../../utils/userRequest";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import SendIcon from "@mui/icons-material/Send";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import VideoCameraBackSharpIcon from "@mui/icons-material/VideoCameraBackSharp";
import imageLiveUrl from "../../../../utils/urlConverter/imageLiveUrl";
import { useTranslation } from "react-i18next";

const UpdateSectors = ({ isVisible, setVisibility, refreshBrandData }) => {
  // get this session data
  const updateBrandData = JSON.parse(sessionStorage.getItem("updateevent"));
  // console.log(updateBrandData)
  const [Title, setTitle] = useState(updateBrandData?.title || "");
  const [titlear, settitlear] = useState(updateBrandData?.title_ar || "");
  const [Date, setDate] = useState(updateBrandData?.date || "");
  const [Description, setDescription] = useState(updateBrandData?.description || "");
  const [Descriptionar, setDescriptionar] = useState(updateBrandData?.description_ar || "");
  const [status, setstatus] = useState(updateBrandData?.status || 0);
  const [Page, setPage] = useState(updateBrandData?.link || 0);
  const [Pagedropdown, setPagedropdown] = useState([]);
  const [imageshow, setimageshow] = useState(
    imageLiveUrl(updateBrandData?.image) || ""
  );
  const [imageshowupload, setimageshowupload] = useState(
    updateBrandData?.image
  );
  const [loading, setLoading] = useState(false);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const getpagedata = async () => {
      try {
        const response = await newRequest.get("/blogs/pages");
        const nameEnArray = response.data;
        setPagedropdown(nameEnArray);
      } catch (error) {
        // console.log(error);
      }
    };

    getpagedata();
  }, []);

  const [selectedFile, setSelectedFile] = useState(null);

  const [selectedOption, setSelectedOption] = useState(
    updateBrandData?.display_type || "image"
  );

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const [selectedVideo, setSelectedVideo] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedVideo(file);
  };
  function handleChangeback(e) {
    setSelectedFile(e.target.files[0]);
    setimageshow(e.target.files[0]);
    setimageshowupload(e.target.files[0]);
  }
  const handleCloseUpdatePopup = () => {
    setVisibility(false);
  };

  const handleUpdateBrand = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("title", Title);
    formData.append("title_ar", titlear);
    formData.append("date", Date);
    formData.append("description", Description);
    formData.append("description_ar", Descriptionar);
    formData.append("link", Page);
    formData.append("display_type", selectedOption);
    formData.append("image", imageshowupload);
    formData.append("status", Number(status));
    try {
      const response = await newRequest.put(
        `/updateupcoming_events/${updateBrandData?.id}`,
        formData
      );

      toast.success(
        response?.data?.message || response?.data?.error ||
          `${t("Events")} ${t("has been")} ${t("Updated Successfully")}.`);
      refreshBrandData();
      handleCloseUpdatePopup();
    } catch (error) {
      toast.error(
        error?.response?.data?.message || `${t("Something went wrong")}`);
      // console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {isVisible && (
        <div className="popup-overlay z-50">
          <div className="popup-container h-auto sm:w-[45%] w-full">
            <div
              className="popup-form w-full"
              style={{ maxHeight: "90vh", overflowY: "auto" }}
            >
              <form className="w-full">
                <h2
                  className={`text-secondary font-sans font-semibold text-2xl ${
                    i18n.language === "ar" ? "text-end" : "text-start"
                  }`}
                >
                  {t("Edit")} {t("Sectors")}
                </h2>

                <div className="flex flex-col sm:gap-3 gap-3 mt-5">
                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                    <label
                      htmlFor="field1"
                      className={`text-secondary  ${
                        i18n.language === "ar" ? "text-end" : "text-start"
                      }`}
                    >
                      {t("Title")} {t("[English]")}
                    </label>
                    <input
                      type="text"
                      id="Title"
                      value={Title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder={`${t("Enter")} ${t("Title")} ${t(
                        "[English]"
                      )}`}
                      className={`border-[1px] w-full rounded-sm border-[#8E9CAB] p-2 mb-3 ${
                        i18n.language === "ar" ? "text-end" : "text-start"
                      }`}
                    />
                  </div>

                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                    <label
                      htmlFor="title_ar"
                      className={`text-secondary  ${
                        i18n.language === "ar" ? "text-end" : "text-start"
                      }`}
                    >
                      {t("Title")} {t("[Arabic]")}
                    </label>
                    <input
                      type="text"
                      id="title_ar"
                      value={titlear}
                      onChange={(e) => settitlear(e.target.value)}
                      placeholder={`${t("Enter")} ${t("Title")} ${t(
                        "[Arabic]"
                      )}`}
                      className={`border-[1px] w-full rounded-sm border-[#8E9CAB] p-2 mb-3 ${
                        i18n.language === "ar" ? "text-end" : "text-start"
                      }`}
                    />
                  </div>

                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                    <label
                      htmlFor="status"
                      className={`text-secondary  ${
                        i18n.language === "ar" ? "text-end" : "text-start"
                      }`}
                    >
                      {t("Set Page")}
                    </label>
                    <select
                      id="status"
                      value={Page}
                      onChange={(e) => setPage(e.target.value)}
                      className={`border-[1px] w-full rounded-sm border-[#8E9CAB] p-2 mb-3 ${
                        i18n.language === "ar" ? "text-end" : "text-start"
                      }`}
                    >
                      <option value="Select">-- {t("Select")} --</option>
                      {Pagedropdown &&
                        Pagedropdown.map((itme, index) => {
                          return (
                            <option key={index} value={itme.slug}>
                              {itme.name}
                            </option>
                          );
                        })}
                    </select>
                  </div>

                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                    <label
                      htmlFor="description"
                      className={`text-secondary  ${
                        i18n.language === "ar" ? "text-end" : "text-start"
                      }`}
                    >
                      {" "}
                      {t("Description")}
                    </label>
                    <input
                      type="text"
                      id="description"
                      value={Description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder={`${t("Enter")} ${t("Description")}`}
                      className={`border-[1px] w-full rounded-sm border-[#8E9CAB] p-2 mb-3 ${
                        i18n.language === "ar" ? "text-end" : "text-start"
                      }`}
                    />
                  </div>

                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                    <label
                      htmlFor="descriptionarabic"
                      className={`text-secondary  ${
                        i18n.language === "ar" ? "text-end" : "text-start"
                      }`}
                    >
                      {" "}
                      {t("Description Arabic")}
                    </label>
                    <input
                      type="text"
                      id="descriptionarabic"
                      value={Descriptionar}
                      onChange={(e) => setDescriptionar(e.target.value)}
                      placeholder={`${t("Enter")} ${t("Description [Arabic]")}`}
                      className={`border-[1px] w-full rounded-sm border-[#8E9CAB] p-2 mb-3 ${
                        i18n.language === "ar" ? "text-end" : "text-start"
                      }`}
                    />
                  </div>

                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                    <label
                      htmlFor="field1"
                      className={`text-secondary  ${
                        i18n.language === "ar" ? "text-end" : "text-start"
                      }`}
                    >
                      {t("Date")}
                    </label>
                    <input
                      type="date"
                      id="Date"
                      value={Date}
                      onChange={(e) => setDate(e.target.value)}
                      placeholder={`${t("Enter")} ${t("Date")}`}
                      className={`border-[1px] w-full rounded-sm border-[#8E9CAB] p-2 mb-3 ${
                        i18n.language === "ar" ? "text-end" : "text-start"
                      }`}
                    />
                  </div>
                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                    <label
                      htmlFor="status"
                      className={`text-secondary  ${
                        i18n.language === "ar" ? "text-end" : "text-start"
                      }`}
                    >
                      {t("Status")}
                    </label>
                    <select
                      id="status"
                      value={status}
                      onChange={(e) => setstatus(e.target.value)}
                      className={`border-[1px] w-full rounded-sm border-[#8E9CAB] p-2 mb-3 ${
                        i18n.language === "ar" ? "text-end" : "text-start"
                      }`}
                    >
                      <option value="0">{t("Inactive")}</option>
                      <option value="1">{t("Active")}</option>
                    </select>
                  </div>
                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                    <label
                      htmlFor="field1"
                      className={`text-secondary  ${
                        i18n.language === "ar" ? "text-end" : "text-start"
                      }`}
                    >
                      {t("Display")}
                    </label>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <div
                        style={{
                          marginRight: "10px",
                          border: "1px solid #e4e6fc",
                        }}
                      >
                        <input
                          type="radio"
                          id="imageRadio"
                          value="image"
                          checked={selectedOption === "image"}
                          onChange={handleOptionChange}
                          style={{ display: "none" }}
                        />
                        <label
                          htmlFor="imageRadio"
                          style={{
                            padding: "5px 10px",
                            cursor: "pointer",
                            backgroundColor:
                              selectedOption === "image"
                                ? "#6777ef"
                                : "transparent",
                            color:
                              selectedOption === "image" ? "white" : "black",
                          }}
                        >
                          <InsertPhotoIcon />
                        </label>
                      </div>

                      <div
                        style={{
                          marginRight: "10px",
                          border: "1px solid #e4e6fc",
                        }}
                      >
                        <input
                          type="radio"
                          id="videoRadio"
                          value="video"
                          checked={selectedOption === "video"}
                          onChange={handleOptionChange}
                          style={{ display: "none" }}
                        />
                        <label
                          htmlFor="videoRadio"
                          style={{
                            padding: "5px 10px",
                            cursor: "pointer",
                            backgroundColor:
                              selectedOption === "video"
                                ? "#6777ef"
                                : "transparent",
                            color:
                              selectedOption === "video" ? "white" : "black",
                          }}
                        >
                          <VideoCameraBackSharpIcon />
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="printerPic font-body sm:text-base text-sm flex flex-col gap-2">
                    {/* <center> */}
                    <label
                      htmlFor="Image"
                      className={`text-secondary  ${
                        i18n.language === "ar" ? "text-end" : "text-start"
                      }`}
                    >
                      {t("Event Video")}
                    </label>
                    <input
                      id="file-Video"
                      type="file"
                      accept="video/*"
                      onChange={handleFileChange}
                      className={`border-[1px] w-full rounded-sm border-[#8E9CAB] p-2 mb-3 ${
                        i18n.language === "ar" ? "text-end" : "text-start"
                      }`}
                    />

                    {/* </center> */}
                  </div>

                  <div className="printerPic font-body sm:text-base text-sm flex flex-col gap-2">
                    {/* <center> */}
                    <label
                      htmlFor="Image"
                      className={`text-secondary  ${
                        i18n.language === "ar" ? "text-end" : "text-start"
                      }`}
                    >
                      {t("Image")}
                    </label>
                    <div className="imgesection">
                      <img
                        src={
                          selectedFile
                            ? URL.createObjectURL(selectedFile)
                            : imageshow != null
                            ? imageshow
                            : ""
                        }
                        className="printerpic border-2"
                        style={{
                          width: selectedFile || imageshow ? "200px" : "200px",
                          height: selectedFile || imageshow ? "200px" : "200px",
                        }}
                      />

                      <div className="row " htmlFor="file-inputs">
                        <label
                          htmlFor="file-inputs"
                          className="choosefile bg-secondary hover:bg-primary2 text-white font-sans px-10 py-2 ml-5"
                        >
                          choose file
                        </label>
                        <input
                          id="file-inputs"
                          type="file"
                          onChange={handleChangeback}
                          style={{ display: "none" }}
                        />
                      </div>
                    </div>

                    {/* </center> */}
                  </div>
                </div>
                <div className="w-full flex justify-center items-center gap-8 mt-5">
                  <button
                    type="button"
                    className="px-5 py-2 w-[30%] rounded-sm bg-primary text-white font-body text-sm"
                    onClick={handleCloseUpdatePopup}
                  >
                    {t("Close")}
                  </button>
                  <Button
                    variant="contained"
                    style={{ backgroundColor: "#021F69", color: "#ffffff" }}
                    onClick={handleUpdateBrand}
                    disabled={loading}
                    className="w-[70%] ml-2"
                    endIcon={
                      loading ? (
                        <CircularProgress size={24} color="inherit" />
                      ) : (
                        <SendIcon />
                      )
                    }
                  >
                    {t("Update")} {t("Sectors")}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateSectors;
