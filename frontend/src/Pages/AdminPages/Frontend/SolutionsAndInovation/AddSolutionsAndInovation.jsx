import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import newRequest from "../../../../utils/userRequest";
import { useTranslation } from "react-i18next";

const Addfeaturedservice = ({ isVisible, setVisibility, refreshBrandData }) => {
  const [Page, setPage] = useState("");
  const [Pagedropdown, setPagedropdown] = useState([]);
  const [Title, setTitle] = useState("");
  const [Titlear, setTitlear] = useState("");
  const [description, setDescription] = useState("");
  const [descriptionar, setDescriptionar] = useState("");
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
  const handleCloseCreatePopup = () => {
    setVisibility(false);
  };

  const [selectedFile, setSelectedFile] = useState(null);
  const [imageshow, setimageshow] = useState("");

  function handleChangeback(e) {
    setSelectedFile(e.target.files[0]);
    setimageshow(e.target.files[0]);
  }

  const handleAddCompany = async () => {
    const formData = new FormData();
    formData.append("image", imageshow);
    formData.append("link", Page);
    formData.append("name_en", Title);
    formData.append("name_ar", Titlear);
    formData.append("description", description);
    formData.append("description_ar", descriptionar);
    formData.append("status", 1);
    try {
      const response = await newRequest.post(
        "/creatfeatured_services",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success(
        `${t("Solution and Innvoations")} ${Page} ${t(
          "has been added successfully"
        )}.`
      );
      // console.log(response.data);
      refreshBrandData();
      handleCloseCreatePopup();
    } catch (error) {
      console.log(error.response.data);
      toast.error(error?.response?.data?.error || "Something Went Wrong");
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
                  {t("Add")} {t("Help Resources")}
                </h2>
                <div className="flex flex-col sm:gap-3 gap-3 mt-5">
                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                    <label
                      htmlFor="field1"
                      className={`text-secondary  ${
                        i18n.language === "ar" ? "text-end" : "text-start"
                      }`}
                    >
                      {t("Title[English]")}{" "}
                    </label>
                    <input
                      type="text"
                      id="Title"
                      value={Title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder={`${t("Enter")} ${t("Title[English]")}`}
                      className={`border-[1px] w-full rounded-sm border-[#8E9CAB] p-2 mb-3 ${
                        i18n.language === "ar" ? "text-end" : "text-start"
                      }`}
                    />
                  </div>

                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                    <label
                      htmlFor="titlear"
                      className={`text-secondary  ${
                        i18n.language === "ar" ? "text-end" : "text-start"
                      }`}
                    >
                      {t("Title [Arabic]")}{" "}
                    </label>
                    <input
                      type="text"
                      id="titlear"
                      value={Titlear}
                      onChange={(e) => setTitlear(e.target.value)}
                      placeholder={`${t("Enter")} ${t("Title [Arabic]")}`}
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
                      {t("Description")}{" "}
                    </label>
                    <input
                      type="text"
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder={`${t("Enter")} ${t("Description")}`}
                      className={`border-[1px] w-full rounded-sm border-[#8E9CAB] p-2 mb-3 ${
                        i18n.language === "ar" ? "text-end" : "text-start"
                      }`}
                    />
                  </div>

                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                    <label
                      htmlFor="descriptionArabic"
                      className={`text-secondary  ${
                        i18n.language === "ar" ? "text-end" : "text-start"
                      }`}
                    >
                      {t("Description Arabic")}{" "}
                    </label>
                    <input
                      type="text"
                      id="descriptionArabic"
                      value={descriptionar}
                      onChange={(e) => setDescriptionar(e.target.value)}
                      placeholder={`${t("Enter")} ${t("Description [Arabic]")}`}
                      className={`border-[1px] w-full rounded-sm border-[#8E9CAB] p-2 mb-3 ${
                        i18n.language === "ar" ? "text-end" : "text-start"
                      }`}
                    />
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

                      <div className="row " htmlFor="file-inputs">
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
                    {t("Add")} {t("Help Resource")}
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

export default Addfeaturedservice;
