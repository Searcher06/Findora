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
      className={`w-full border rounded-lg sm:rounded-xl border-gray-200 p-4 sm:p-5 md:p-6 overflow-visible ${className}`}
      onSubmit={(event) => event.preventDefault()}
    >
      {/* Item Type Selector - Stacks vertically on mobile */}
      <Label text="Item Type" htmlFor="status" />
      <div className="mb-3 sm:mb-4 flex flex-col sm:flex-row gap-2 w-full sm:p-1.5 bg-linear-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200">
        <button
          type="button"
          name="status"
          onClick={() =>
            handleInputChange({ target: { name: "status", value: "lost" } })
          }
          className={`flex-1 h-11 sm:h-12 px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-200 flex items-center justify-center gap-2 sm:gap-2.5 ${
            itemData.status === "lost"
              ? "bg-white text-blue-700 shadow-md shadow-blue-100 ring-1 ring-blue-500 scale-[1.02]"
              : "bg-transparent text-gray-600 hover:text-gray-900 hover:bg-white/50"
          }`}
        >
          <div
            className={`p-1.5 rounded-md ${
              itemData.status === "lost" ? "bg-blue-100" : "bg-gray-200"
            }`}
          >
            <SearchX className="w-4 h-4" />
          </div>
          <span className="whitespace-nowrap">I Lost an Item</span>
        </button>
        <button
          type="button"
          name="status"
          onClick={() =>
            handleInputChange({ target: { name: "status", value: "found" } })
          }
          className={`flex-1 h-11 sm:h-12 px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-200 flex items-center justify-center gap-2 sm:gap-2.5 ${
            itemData.status === "found"
              ? "bg-white text-green-700 shadow-md shadow-green-100 ring-1 ring-green-500 scale-[1.02]"
              : "bg-transparent text-gray-600 hover:text-gray-900 hover:bg-white/50"
          }`}
        >
          <div
            className={`p-1.5 rounded-md ${
              itemData.status === "found" ? "bg-green-100" : "bg-gray-200"
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <span className="whitespace-nowrap">I Found an Item</span>
        </button>
      </div>

      {/* Item Name - Responsive */}
      <Label text="Item Name" htmlFor="itemName" />
      <input
        id="itemName"
        type="text"
        name="itemName"
        placeholder="e.g. Samsung Galaxy S5"
        className="mb-2 sm:mb-3 p-2 sm:p-2.5 border border-gray-300 outline-0 text-xs sm:text-sm w-full h-8 sm:h-9 rounded-sm focus:ring-2 focus:ring-blue-500 transition-all"
        value={itemData.itemName}
        onChange={handleInputChange}
      />

      {/* Category - Responsive */}
      <Label text="Category" htmlFor="category" />
      <select
        name="category"
        id="category"
        value={itemData.category}
        className="mb-2 sm:mb-3 font-sans w-full text-xs sm:text-sm h-8 sm:h-9 block px-2 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
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

      {/* Description - Responsive */}
      <Label text="Description" htmlFor="itemDescription" />
      <textarea
        name="itemDescription"
        id="itemDescription"
        value={itemData.itemDescription}
        onChange={handleInputChange}
        rows={4}
        placeholder="A dark colored Samsung phone left in the library..."
        className="mb-2 sm:mb-3 block outline-0 text-xs sm:text-sm font-sans p-2 sm:p-2.5 border border-gray-300 rounded-lg resize-none w-full focus:ring-2 focus:ring-blue-500 transition-all"
      ></textarea>

      {/* Location - Responsive */}
      <Label text="Location" htmlFor="location" />
      <input
        type="text"
        id="location"
        name="location"
        value={itemData.location}
        onChange={handleInputChange}
        placeholder="e.g. Main library"
        className="mb-2 sm:mb-3 p-2 sm:p-2.5 border border-gray-300 outline-0 text-xs sm:text-sm w-full h-8 sm:h-9 rounded-sm focus:ring-2 focus:ring-blue-500 transition-all"
      />

      {/* Date - Responsive */}
      <Label
        text={`${itemData.status === "lost" ? "Date Lost" : "Date Found"}`}
        htmlFor="dateLostOrFound"
      />
      <input
        type="date"
        name="dateLostOrFound"
        value={itemData.dateLostOrFound}
        onChange={handleInputChange}
        id="dateLostOrFound"
        className="mb-3 sm:mb-4 block p-2 sm:p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs sm:text-sm w-full transition-all"
      />

      {/* Photo Upload Section */}
      <div className="w-full flex justify-between items-center mb-2">
        <Label text="Upload Photo" htmlFor="photo" />
        <ToggleImage />
      </div>

      <PhotoDisplay
        setItemData={setItemData}
        handlePhotoChange={handlePhotoChange}
        preview={preview}
      />

      {/* Submit Button - Responsive */}
      <Button
        className="text-xs sm:text-sm md:text-base mt-3 sm:mt-4 font-sans mb-2 w-full h-10 sm:h-11"
        onClick={handleSubmit}
      >
        {loading ? <Spinner /> : null}
        {getButtonText()}
      </Button>
    </form>
  );
};

export default AddInfo;
