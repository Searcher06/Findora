import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useLocation } from "react-router-dom";
import { SearchX, CheckCircle2 } from "lucide-react";
import Label from "./Label";
import ToggleImage from "./ToggleImage";
import PhotoDisplay from "./PhotoDisplay";

const AddInfo = ({
  className,
  itemData,
  handleInputChange,
  handleSubmit,
  loading,
  setItemData,
  handlePhotoChange,
  preview,
}) => {
  const location = useLocation();
  const isUpdateRoute = location.pathname.startsWith("/update/");

  const getButtonText = () => {
    if (loading) {
      return isUpdateRoute ? "Updating item..." : "Posting item...";
    }
    return isUpdateRoute ? "Update Item" : "Post Item";
  };

  return (
    <form
      className={`w-full border rounded-lg border-gray-200 p-4 overflow-visible ${className}`}
      onSubmit={(event) => event.preventDefault()}
    >
      <Label text={"Item Type"} htmlFor={"status"} />
      <div className="mb-3 flex flex-col sm:flex-row gap-2 sm:gap-2 w-full sm:p-1.5 bg-linear-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200">
        <button
          type="button"
          name="status"
          onClick={() =>
            handleInputChange({ target: { name: "status", value: "lost" } })
          }
          className={`flex-1 h-10 sm:h-11 md:h-12 px-2 sm:px-3 md:px-4 py-2 text-xs sm:text-sm md:text-base font-semibold rounded-lg transition-all duration-200 flex items-center justify-center gap-1.5 sm:gap-2 md:gap-2.5 ${
            itemData.status === "lost"
              ? "bg-white text-blue-700 shadow-md shadow-blue-100 ring-1 ring-blue-500 scale-[1.02]"
              : "bg-transparent text-gray-600 hover:text-gray-900 hover:bg-white/50"
          }`}
        >
          <div
            className={`p-1 sm:p-1.5 rounded-md shrink-0 ${
              itemData.status === "lost" ? "bg-blue-100" : "bg-gray-200"
            }`}
          >
            <SearchX className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
          </div>
          <span className="whitespace-nowrap text-xs sm:text-sm md:text-base">
            I Lost an Item
          </span>
        </button>
        <button
          type="button"
          name="status"
          onClick={() =>
            handleInputChange({ target: { name: "status", value: "found" } })
          }
          className={`flex-1 h-10 sm:h-11 md:h-12 px-2 sm:px-3 md:px-4 py-2 text-xs sm:text-sm md:text-base font-semibold rounded-lg transition-all duration-200 flex items-center justify-center gap-1.5 sm:gap-2 md:gap-2.5 ${
            itemData.status === "found"
              ? "bg-white text-green-700 shadow-md shadow-green-100 ring-1 ring-green-500 scale-[1.02]"
              : "bg-transparent text-gray-600 hover:text-gray-900 hover:bg-white/50"
          }`}
        >
          <div
            className={`p-1 sm:p-1.5 rounded-md shrink-0 ${
              itemData.status === "found" ? "bg-green-100" : "bg-gray-200"
            }`}
          >
            <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
          </div>
          <span className="whitespace-nowrap text-xs sm:text-sm md:text-base">
            I Found an Item
          </span>
        </button>
      </div>

      <Label text={"Item Name"} htmlFor={"itemName"} />
      <input
        id="itemName"
        type="text"
        name="itemName"
        placeholder="e.g. Samsung Galaxy S5"
        className="mb-2 p-2 border border-gray-300 outline-0 text-xs sm:text-sm w-full h-8 rounded-sm"
        value={itemData.itemName}
        onChange={handleInputChange}
      />

      <Label text={"Category"} htmlFor={"category"} />
      <select
        name="category"
        id="category"
        value={itemData.category}
        className="mb-2 font-sans w-full text-xs sm:text-sm block p-1 border border-gray-300 rounded-lg focus:outline-none"
        onChange={handleInputChange}
      >
        <option value="" disabled>
          Select category
        </option>
        <option value="Electronics">Electronics</option>
        <option value="Books & Stationary">Books & Stationary</option>
        <option value="Bags & Accessories">Bags & Accessories</option>
        <option value="Clothing & Wearables">Clothing & Wearables</option>
      </select>

      <Label text={"Description"} htmlFor={"itemDescription"} />
      <textarea
        name="itemDescription"
        id="itemDescription"
        value={itemData.itemDescription}
        onChange={handleInputChange}
        rows={4}
        placeholder="A Dark colored samsung phone left in the library..."
        className="mb-2 block outline-0 text-xs sm:text-sm font-sans p-2 border border-gray-300 rounded-lg resize-none w-full"
      ></textarea>

      <Label text={"Location"} htmlFor={"location"} />
      <input
        type="text"
        id="location"
        name="location"
        value={itemData.location}
        onChange={handleInputChange}
        placeholder="e.g. Main library"
        className="mb-2 p-2 border border-gray-300 outline-0 text-xs sm:text-sm w-full h-8 rounded-sm"
      />

      <Label
        text={`${itemData.status === "lost" ? "Date Lost" : "Date Found"}`}
        htmlFor={"dateLostOrFound"}
      />
      <input
        type="date"
        name="dateLostOrFound"
        value={itemData.dateLostOrFound}
        onChange={handleInputChange}
        id="dateLostOrFound"
        className="mb-3 block p-2 border border-gray-300 rounded-lg focus:outline-0 text-xs sm:text-sm w-full"
      />

      <div className="w-full flex justify-between">
        <Label text={"Upload Photo"} htmlFor={"photo"} />
        <ToggleImage />
      </div>

      <PhotoDisplay
        setItemData={setItemData}
        handlePhotoChange={handlePhotoChange}
        preview={preview}
      />

      <Button
        className={"text-xs sm:text-sm md:text-base mt-3 font-sans mb-3 w-full"}
        onClick={handleSubmit}
      >
        {loading ? <Spinner /> : null}
        {getButtonText()}
      </Button>
    </form>
  );
};

export default AddInfo;
