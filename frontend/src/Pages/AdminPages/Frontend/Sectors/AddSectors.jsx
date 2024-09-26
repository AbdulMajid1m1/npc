import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import newRequest from "../../../../utils/userRequest";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import VideoCameraBackSharpIcon from "@mui/icons-material/VideoCameraBackSharp";
import { useTranslation } from "react-i18next";

const AddSectors = ({ isVisible, setVisibility, refreshBrandData }) => {
  const [Title, setTitle] = useState("");
  const [titlear, settitlear] = useState("");
  const [Date, setDate] = useState("");
  const [Description, setDescription] = useState("");
  const [Descriptionar, setDescriptionar] = useState("");
  const [Page, setPage] = useState("");
  const [Pagedropdown, setPagedropdown] = useState([]);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const getpagedata = async () => {
      try {
        const response = await newRequest.get("/blogs/pages");
        const nameEnArray = response.data;
        // console.log(nameEnArray);
        setPagedropdown(nameEnArray);
      } catch (error) {
        // console.log(error);
      }
    };

    getpagedata();
  }, []);

  const handleCloseCreatePopup = () => {
    setVisibility(false);
  };

  const [selectedFile, setSelectedFile] = useState(null);
  const [imageshow, setimageshow] = useState("");

  function handleChangeback(e) {
    setSelectedFile(e.target.files[0]);
    setimageshow(e.target.files[0]);
  }

  const [selectedOption, setSelectedOption] = useState("image");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const [selectedVideo, setSelectedVideo] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedVideo(file);
  };

  const handleAddCompany = async () => {
    const formData = new FormData();
    formData.append("title", Title);
    formData.append("title_ar", titlear);
    formData.append("date", Date);
    formData.append("description", Description);
    formData.append("description_ar", Descriptionar);
    formData.append("link", Page);
    formData.append("display_type", selectedOption);
    formData.append("image", imageshow);
    formData.append("status", 1);
    try {
      const response = await newRequest.post(
        "/creatupcoming_events",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success(
        `${t("Sectors")} ${Title} ${t("has been added successfully")}.`
      );
      // console.log(response.data);
      refreshBrandData();
      handleCloseCreatePopup();
    } catch (error) {
      toast.error(error?.response?.data?.error || "Something went wrong");
      // console.log(error);
    }
  };

  return (
    <div>
      {/* create the post api popup */}
      {isVisible && (
        <div className="popup-overlay z-50">
          <div className="popup-container h-auto sm:w-[45%] w-full">
            <div
              className="popup-form w-full "
              style={{ maxHeight: "90vh", overflowY: "auto" }}
            >
              <form className="w-full">
                <h2
                  className={`text-secondary font-sans font-semibold text-2xl ${
                    i18n.language === "ar" ? "text-end" : "text-start"
                  }`}
                >
                  {t("Add")} {t("Sectors")}
                </h2>
                <div className="flex flex-col sm:gap-3 gap-3 mt-5">
                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                    <label
                      htmlFor="field1"
                      className={`text-secondary  ${
                        i18n.language === "ar" ? "text-end" : "text-start"
                      }`}
                    >
                      {t("Title")} {t("[English]")}{" "}
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
                      {t("Description [Arabic]")}
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
                      {" "}
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
                        className="printerpic"
                        style={{
                          width: selectedFile || imageshow ? "200px" : "200px",
                          height: selectedFile || imageshow ? "200px" : "200px",
                        }}
                      />

                      <div className="row" htmlFor="file-inputs">
                        <label
                          htmlFor="file-inputs"
                          className="choosefile bg-secondary hover:bg-primary2 text-white font-sans px-10 py-2 ml-5"
                        >
                          {t("choose file")}
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
                    onClick={handleCloseCreatePopup}
                  >
                    {t("Close")}
                  </button>
                  <button
                    type="button"
                    onClick={handleAddCompany}
                    className="px-5 py-2 rounded-sm w-[70%] bg-secondary text-white font-body text-sm ml-2"
                  >
                    {t("Add")} {t("Sector")}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddSectors;
