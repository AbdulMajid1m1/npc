import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import newRequest from "../../../../utils/userRequest";
import { useTranslation } from "react-i18next";

const Addcategories = ({ isVisible, setVisibility, refreshBrandData }) => {
  const [category_name_en, setcategory_name_en] = useState("");
  const [category_name_ar, setcategory_name_ar] = useState("");
  const [captionEr, setCaptionEr] = useState("");
  const [captionAr, setCaptionAr] = useState("");
  const [Categorylevel, setCategorylevel] = useState("");
  const [Page, setPage] = useState("");
  const [Pagedropdown, setPagedropdown] = useState([]);
  const [MegaMenuCategories, setMegaMenuCategories] = useState("");
  const [megamenudropdown, setmegamenudropdown] = useState([]);
  const [Description, setDescription] = useState("");
  const [Title, setTitle] = useState("");
  const [MetaDescription, setMetaDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageshow, setimageshow] = useState("");

  function handleChangeback(e) {
    setSelectedFile(e.target.files[0]);
    setimageshow(e.target.files[0]);
  }

  const { t, i18n } = useTranslation();
  useEffect(() => {
    const getDocuments = async () => {
      try {
        const response = await newRequest.get("/getAllmega_menu");
        const nameEnArray = response.data;
        setmegamenudropdown(nameEnArray);
      } catch (error) {
        // console.log(error);
      }
    };

    const getpagedata = async () => {
      try {
        const response = await newRequest.get("/blogs/pages");
        const nameEnArray = response.data;
        setPagedropdown(nameEnArray);
        // console.log('--------', nameEnArray);
      } catch (error) {
        // console.log(error);
      }
    };

    getDocuments();
    getpagedata();
  }, []);
  const handleCloseCreatePopup = () => {
    setVisibility(false);
  };

  const handleAddCompany = async () => {
    const formData = new FormData();
    formData.append("parent_id", Categorylevel || "Main Category");
    formData.append("megamenu_id", MegaMenuCategories);
    formData.append("category_name_en", category_name_en);
    formData.append("category_name_ar", category_name_ar);
    formData.append("caption", captionEr);
    formData.append("caption_ar", captionAr);
    formData.append("description", Description);
    formData.append("url", Page);
    formData.append("meta_title", Title);
    formData.append("meta_description", MetaDescription);
    formData.append("meta_keywords", "khan");
    formData.append("status", 1);
    formData.append("image", imageshow); // Assuming `image` is the file object
  
    try {
      const response = await newRequest.post("/creatmega_menu_categories/", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
  
      toast.success(
        `Mega Menu categories ${category_name_en} has been added successfully.`
      );
  
      refreshBrandData();
      handleCloseCreatePopup();
    } catch (error) {
      toast.error(
        error?.response?.data?.error ||
        error?.response?.data?.message ||
        `${t("Something went wrong")}`
      );
    }
  };
  
  return (
    <div>
      {/* create the post api popup */}
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
                  {t("Add")} {t("Mega Menu")} {t("Categories")}
                </h2>
                <div className="flex flex-col sm:gap-3 gap-3 mt-5">
                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                    <label
                      htmlFor="field1"
                      className={`text-secondary  ${
                        i18n.language === "ar" ? "text-end" : "text-start"
                      }`}
                    >
                      {t("Categories")} {t("Name[English]")}
                    </label>
                    <input
                      type="text"
                      id="category_name_en"
                      value={category_name_en}
                      onChange={(e) => setcategory_name_en(e.target.value)}
                      placeholder={`${t("Enter")} ${t("Categories")} ${t(
                        "Name[English]"
                      )}`}
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
                      {t("Categories")} {t("Name[Arabic]")}
                    </label>
                    <input
                      type="text"
                      id="category_name_ar"
                      value={category_name_ar}
                      onChange={(e) => setcategory_name_ar(e.target.value)}
                      placeholder={`${t("Enter")} ${t("Categories")} ${t(
                        "Name[Arabic]"
                      )}`}
                      className={`border-[1px] w-full rounded-sm border-[#8E9CAB] p-2 mb-3 ${
                        i18n.language === "ar" ? "text-end" : "text-start"
                      }`}
                    />
                  </div>

                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                    <label
                      htmlFor="captionEr"
                      className={`text-secondary  ${
                        i18n.language === "ar" ? "text-end" : "text-start"
                      }`}
                    >
                      {t("Caption")} {t("English")}
                    </label>
                    <input
                      type="text"
                      id="captionEr"
                      value={captionEr}
                      onChange={(e) => setCaptionEr(e.target.value)}
                      placeholder={`${t("Enter")} ${t("Caption")} ${t(
                        "English"
                      )}`}
                      className={`border-[1px] w-full rounded-sm border-[#8E9CAB] p-2 mb-3 ${
                        i18n.language === "ar" ? "text-end" : "text-start"
                      }`}
                    />

                    <label
                      htmlFor="captionAr"
                      className={`text-secondary  ${
                        i18n.language === "ar" ? "text-end" : "text-start"
                      }`}
                    >
                      {t("Caption")} {t("Arabic")}
                    </label>
                    <input
                      type="text"
                      id="captionAr"
                      value={captionAr}
                      onChange={(e) => setCaptionAr(e.target.value)}
                      placeholder={`${t("Enter")} ${t("Caption")} ${t(
                        "Arabic"
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
                      {t("Add")} {t("Menu")} {t("Categories")}
                    </label>
                    <select
                      id="status"
                      value={MegaMenuCategories}
                      onChange={(e) => setMegaMenuCategories(e.target.value)}
                      className={`border-[1px] w-full rounded-sm border-[#8E9CAB] p-2 mb-3 ${
                        i18n.language === "ar" ? "text-end" : "text-start"
                      }`}
                    >
                      <option value="0">-- {t("Select")} --</option>
                      {megamenudropdown &&
                        megamenudropdown.map((itme, index) => {
                          return (
                            <option key={index} value={itme.id}
                              dangerouslySetInnerHTML={{
                                __html: itme.name_en,
                              }}
                            >
                              {/* {itme.name_en} */}  
                            </option>
                          );
                        })}
                    </select>
                  </div>

                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-2">
                    <label
                      htmlFor="status"
                      className={`text-secondary  ${
                        i18n.language === "ar" ? "text-end" : "text-start"
                      }`}
                    >
                      {t("Select Category Level")}
                    </label>
                    <select
                      id="status"
                      value={Categorylevel}
                      onChange={(e) => setCategorylevel(e.target.value)}
                      className={`border-[1px] w-full rounded-sm border-[#8E9CAB] p-2 mb-3 ${
                        i18n.language === "ar" ? "text-end" : "text-start"
                      }`}
                    >
                      <option value="Category Level">Category Level</option>
                      <option value="Main Category">Main Category</option>
                    </select>
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
                      <option value="0">-- {t("Select")} --</option>
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
                      htmlFor="status"
                      className={`text-secondary  ${
                        i18n.language === "ar" ? "text-end" : "text-start"
                      }`}
                    >
                      {t("Description")}
                    </label>
                    <textarea
                      type="text"
                      id="name_ar"
                      value={Description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder={`${t("Enter")}${t("Description")}`}
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
                      {t("Meta")} {t("Title")}
                    </label>
                    <input
                      type="text"
                      id="Title"
                      value={Title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder={`${t("Enter")}${t("Meta")}${t("Title")}`}
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
                      {t("Meta")} {t("Description")}
                    </label>
                    <textarea
                      type="text"
                      id="name_ar"
                      value={MetaDescription}
                      onChange={(e) => setMetaDescription(e.target.value)}
                      placeholder={`${t("Enter")}${t("Meta")}${t(
                        "Description"
                      )}`}
                      className={`border-[1px] w-full rounded-sm border-[#8E9CAB] p-2 mb-3 ${
                        i18n.language === "ar" ? "text-end" : "text-start"
                      }`}
                    />
                  </div>
                </div>


                <div className="font-body sm:text-base text-sm flex flex-col gap-2">
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
                    {t("Add")} {t("Menu")} {t("Categories")}
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

export default Addcategories;
