import AddInfo from "../components/AddInfo";
import { useState } from "react";
import { useItems } from "../hooks/useItems";
import { toast } from "react-toastify";
import { useItemType } from "../context/ItemTypeContext";
import { useNavigate } from "react-router-dom";

const ReportPage = () => {
  const navigate = useNavigate();
  const { loading, createAnItem } = useItems();
  const { postType } = useItemType();
  const [preview, setPreview] = useState(null);
  const [itemData, setItemData] = useState({
    itemName: "",
    itemDescription: "",
    category: "",
    location: "",
    image: "",
    status: postType,
    dateLostOrFound: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setItemData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    if (itemData.itemName) formData.append("itemName", itemData.itemName);
    if (itemData.itemDescription)
      formData.append("itemDescription", itemData.itemDescription);
    if (itemData.category) formData.append("category", itemData.category);
    if (itemData.image instanceof File) formData.append("image", itemData.image);
    if (itemData.location) formData.append("location", itemData.location);
    if (itemData.dateLostOrFound)
      formData.append("dateLostOrFound", itemData.dateLostOrFound);
    if (itemData.status) formData.append("status", itemData.status);

    try {
      const response = await createAnItem(formData);
      console.log(response);
      navigate("/");
      toast.success("Report created successfully");
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || "Item Report failed");
      } else if (error.request) {
        toast.error("No response from server");
      } else {
        toast.error("An error occured.");
      }
      console.error(error);
    }
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setItemData((prevs) => ({ ...prevs, image: file }));
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-slate-50 via-slate-100/60 to-white px-3 pb-10 pt-3 sm:px-5 md:px-8">
      <div className="pointer-events-none absolute -left-20 top-10 h-52 w-52 rounded-full bg-violet-300/25 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full bg-indigo-300/20 blur-3xl" />

      <div className="relative mx-auto w-full max-w-5xl">
        <section className="rounded-3xl border border-indigo-100 bg-[linear-gradient(135deg,#faf9ff_0%,#ede9fe_52%,#f8f7ff_100%)] px-5 py-7 shadow-[0_35px_90px_-65px_rgba(79,70,229,0.6)] sm:px-8 sm:py-9">
          <img src="/iconplusfindoratext.png" alt="Findora" className="h-7 w-auto" />
          <h1 className="mt-3 font-display text-2xl font-bold leading-tight text-slate-900 sm:text-3xl md:text-4xl">
            Report {itemData.status === "lost" ? "Lost" : "Found"} Item
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-600 sm:text-base">
            Provide accurate details so the community can match reports faster and help
            {itemData.status === "lost"
              ? " return your item safely."
              : " connect owners with their property quickly."}
          </p>
        </section>

        <AddInfo
          className="mt-5 sm:mt-6"
          itemData={itemData}
          handleInputChange={handleInputChange}
          setItemData={setItemData}
          handleSubmit={handleSubmit}
          loading={loading}
          postType={postType}
          handlePhotoChange={handlePhotoChange}
          preview={preview}
        />
      </div>
    </div>
  );
};

export default ReportPage;
