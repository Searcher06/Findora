import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useLocation } from "react-router-dom";
import { SearchX, CheckCircle2, MapPin, ClipboardList, Calendar } from "lucide-react";
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

  const maxDate = new Date().toISOString().split("T")[0];

  return (
    <form
      className={`w-full overflow-visible rounded-3xl border border-sky-100 bg-white/95 p-4 shadow-[0_30px_90px_-65px_rgba(59,130,246,0.7)] backdrop-blur sm:p-6 md:p-8 ${className}`}
      onSubmit={(event) => event.preventDefault()}
    >
      <div className="rounded-2xl border border-sky-100 bg-sky-50/70 p-4 sm:p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">Report Details</p>
        <p className="mt-1 text-sm text-slate-600">
          Fill in the key details so people can quickly identify the item.
        </p>
      </div>

      <div className="mt-5">
        <Label text="Item Type" htmlFor="status" />
        <div className="mt-2 grid gap-2 sm:grid-cols-2">
          <button
            type="button"
            name="status"
            onClick={() =>
              handleInputChange({ target: { name: "status", value: "lost" } })
            }
            className={`flex min-h-12 items-center justify-center gap-2 rounded-xl border px-3 py-2 text-sm font-semibold transition ${
              itemData.status === "lost"
                ? "border-blue-300 bg-blue-50 text-blue-700 shadow-sm"
                : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
            }`}
          >
            <SearchX className="h-4 w-4" />
            I Lost an Item
          </button>
          <button
            type="button"
            name="status"
            onClick={() =>
              handleInputChange({ target: { name: "status", value: "found" } })
            }
            className={`flex min-h-12 items-center justify-center gap-2 rounded-xl border px-3 py-2 text-sm font-semibold transition ${
              itemData.status === "found"
                ? "border-emerald-300 bg-emerald-50 text-emerald-700 shadow-sm"
                : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
            }`}
          >
            <CheckCircle2 className="h-4 w-4" />
            I Found an Item
          </button>
        </div>
      </div>

      <div className="mt-5 grid gap-4 sm:gap-5 md:grid-cols-2">
        <div className="md:col-span-2">
          <Label text="Item Name" htmlFor="itemName" />
          <div className="relative mt-2">
            <ClipboardList className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              id="itemName"
              type="text"
              name="itemName"
              placeholder="e.g. Samsung Galaxy S5"
              className="h-11 w-full rounded-xl border border-slate-300 bg-white pl-10 pr-3 text-sm text-slate-800 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
              value={itemData.itemName}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div>
          <Label text="Category" htmlFor="category" />
          <select
            name="category"
            id="category"
            value={itemData.category}
            className="mt-2 block h-11 w-full rounded-xl border border-slate-300 bg-white px-3 text-sm text-slate-800 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
            onChange={handleInputChange}
          >
            <option value="" disabled>
              Select category
            </option>
            <option value="Electronics">Electronics</option>
            <option value="Books & Stationary">Books & Stationary</option>
            <option value="Bags & Accessories">Bags & Accessories</option>
            <option value="Clothing & Wearables">Clothing & Wearables</option>
            <option value="ID & Cards">ID & Cards</option>
            <option value="Keys & Locks">Keys & Locks</option>
            <option value="Documents">Documents</option>
            <option value="Personal Items">Personal Items</option>
            <option value="Sports & Equipment">Sports & Equipment</option>
            <option value="Others">Others</option>
          </select>
        </div>

        <div>
          <Label
            text={`${itemData.status === "lost" ? "Date Lost" : "Date Found"}`}
            htmlFor="dateLostOrFound"
          />
          <div className="relative mt-2">
            <Calendar className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="date"
              name="dateLostOrFound"
              value={itemData.dateLostOrFound}
              onChange={handleInputChange}
              id="dateLostOrFound"
              max={maxDate}
              className="block h-11 w-full rounded-xl border border-slate-300 bg-white pl-10 pr-3 text-sm text-slate-800 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
            />
          </div>
        </div>

        <div className="md:col-span-2">
          <Label text="Description" htmlFor="itemDescription" />
          <textarea
            name="itemDescription"
            id="itemDescription"
            value={itemData.itemDescription}
            onChange={handleInputChange}
            rows={4}
            placeholder="A dark colored Samsung phone left in the library..."
            className="mt-2 block w-full resize-none rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
          ></textarea>
        </div>

        <div className="md:col-span-2">
          <Label text="Location" htmlFor="location" />
          <div className="relative mt-2">
            <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              id="location"
              name="location"
              value={itemData.location}
              onChange={handleInputChange}
              placeholder="e.g. Main library"
              className="h-11 w-full rounded-xl border border-slate-300 bg-white pl-10 pr-3 text-sm text-slate-800 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
            />
          </div>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between gap-2 rounded-2xl border border-slate-200 bg-slate-50/70 px-3 py-2.5 sm:px-4">
        <Label text="Upload Photo" htmlFor="photo-upload" className="mb-0" />
        <ToggleImage />
      </div>

      <PhotoDisplay
        setItemData={setItemData}
        handlePhotoChange={handlePhotoChange}
        preview={preview}
      />

      <Button
        className="mt-5 h-11 w-full rounded-xl bg-slate-900 text-sm font-semibold text-white transition hover:bg-slate-800 sm:h-12 sm:text-base"
        onClick={handleSubmit}
      >
        {loading ? <Spinner /> : null}
        {getButtonText()}
      </Button>
    </form>
  );
};

export default AddInfo;
