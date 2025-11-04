import Label from "./Label";

const AddInfo = ({ className, postType }) => {
  return (
    <form
      className={`w-full border  rounded-lg border-gray-200 p-4  ${className}`}
    >
      <Label text={"Item Name"} htmlFor={"itemName"} />
      <input
        id="itemName"
        type="text"
        placeholder="e.g. Black Backpack"
        className="mb-2 p-2 border border-gray-300 outline-0 text-xs w-full h-8 rounded-sm"
      />

      <Label text={"Category"} htmlFor={"category"} />

      <select
        name="category"
        id="category"
        className="mb-2 font-sans w-full text-xs h-8 block p-1  border border-gray-300 rounded-lg  focus:outline-none"
      >
        <option value="" disabled selected>
          Select category
        </option>
        <option value="Electronics">Electronics</option>
        <option value="Books & Stationary">Books & Stationary</option>
        <option value="Bags & Accessories">Bags & Accessories</option>
        <option value="Clothing & Wearables">Clothing & Wearables</option>
      </select>

      <Label text={"Description"} htmlFor={"description"} />
      <textarea
        name="description"
        id="description"
        rows={4}
        placeholder="Describe the item, where it was lost or found..."
        className="mb-2 block outline-0 text-xs font-sans p-2 border border-gray-300 rounded-lg resize-none w-full"
      ></textarea>

      <Label text={"Location"} htmlFor={"location"} />
      <input
        type="text"
        id="location"
        name="location"
        placeholder="e.g. Main library"
        className="mb-2 p-2 border border-gray-300 outline-0 text-xs w-full h-8 rounded-sm"
      />

      <Label
        text={`${postType == "lost" ? "Date Lost" : "Date Found"}`}
        htmlFor={"date"}
      />
      <input
        type="date"
        name="date"
        id="date"
        className="block p-2 border border-gray-300 rounded-lg focus:outline-0 text-xs w-full"
      />
    </form>
  );
};

export default AddInfo;
