/* eslint-disable no-unused-vars */
import { Button } from "@/components/ui/button";
import Label from "./Label";
import ToggleImage from "./ToggleImage";
import PhotoDisplay from "./PhotoDisplay";
const AddInfo = ({
  className,
  itemData,
  handleInputChange,
  handleSubmit,
  loading,
  item,
}) => {
  return (
    <form
      className={`w-full border  rounded-lg border-gray-200 p-4  ${className}`}
      onSubmit={(event) => event.preventDefault()}
    >
      <Label text={"Item Type"} htmlFor={"status"} />
      <select
        name="status"
        id="status"
        value={itemData.status}
        className="mb-2 font-sans w-full text-xs h-8 block p-1  border border-gray-300 rounded-lg  focus:outline-none"
        onChange={handleInputChange}
      >
        <option value="" disabled>
          Select item type
        </option>
        <option value="lost">Lost</option>
        <option value="found">Found</option>
      </select>

      <Label text={"Item Name"} htmlFor={"itemName"} />
      <input
        id="itemName"
        type="text"
        name="itemName"
        placeholder="e.g. Samsung Galaxy S5"
        className="mb-2 p-2 border border-gray-300 outline-0 text-xs w-full h-8 rounded-sm"
        value={itemData.itemName}
        onChange={handleInputChange}
      />

      <Label text={"Category"} htmlFor={"category"} />
      <select
        name="category"
        id="category"
        value={itemData.category}
        className="mb-2 font-sans w-full text-xs h-8 block p-1  border border-gray-300 rounded-lg  focus:outline-none"
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
        className="mb-2 block outline-0 text-xs font-sans p-2 border border-gray-300 rounded-lg resize-none w-full"
      ></textarea>

      <Label text={"Location"} htmlFor={"location"} />
      <input
        type="text"
        id="location"
        name="location"
        value={itemData.location}
        onChange={handleInputChange}
        placeholder="e.g. Main library"
        className="mb-2 p-2 border border-gray-300 outline-0 text-xs w-full h-8 rounded-sm"
      />

      <Label
        text={`${itemData.status == "lost" ? "Date Lost" : "Date Found"}`}
        htmlFor={"dateLostOrFound"}
      />
      <input
        type="date"
        name="dateLostOrFound"
        value={itemData.dateLostOrFound}
        onChange={handleInputChange}
        id="dateLostOrFound"
        className="mb-3 block p-2 border border-gray-300 rounded-lg focus:outline-0 text-xs w-full"
      />

      <div className="w-full flex justify-between">
        <Label text={"Upload Photo"} htmlFor={"photo"} />
        <ToggleImage />
      </div>

      <PhotoDisplay />

      <Button
        className={"text-xs mt-3 font-sans mb-3 w-full"}
        onClick={handleSubmit}
      >
        Post Item
      </Button>
    </form>
  );
};

export default AddInfo;
