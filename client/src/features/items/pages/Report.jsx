import { useState } from "react";
import { useItems } from "../hooks/useItems";
import { toast } from "sonner";
import { useItemType } from "../context/ItemTypeContext";
import { useNavigate } from "react-router-dom";
import { handleApiError } from "@/utils/handleApiError";
import {
  ChevronLeft, ChevronRight, SearchX, CheckCircle2,
  ClipboardList, MapPin, Calendar, ImageIcon, X, Loader2,
} from "lucide-react";

// ── Field wrapper ────────────────────────────────────────────────────────────
const Field = ({ label, children, required }) => (
  <div>
    <label className="mb-2 block text-sm font-semibold text-slate-700">
      {label} {required && <span className="text-rose-500">*</span>}
    </label>
    {children}
  </div>
);

const inputCls = "h-11 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-800 outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100";

// ── Step 1: Item type + basic info ───────────────────────────────────────────
const Step1 = ({ itemData, onChange }) => (
  <div className="space-y-5">
    {/* Lost / Found toggle */}
    <Field label="What happened?" required>
      <div className="grid grid-cols-2 gap-3 mt-2">
        <button
          type="button"
          onClick={() => onChange({ target: { name: "status", value: "lost" } })}
          className={`flex items-center justify-center gap-1.5 rounded-full border py-2.5 text-xs font-semibold transition active:scale-[0.98] ${
            itemData.status === "lost"
              ? "border-rose-300 bg-rose-50 text-rose-700"
              : "border-slate-200 bg-white text-slate-500"
          }`}
        >
          <SearchX className="h-3.5 w-3.5" />
          I Lost It
        </button>
        <button
          type="button"
          onClick={() => onChange({ target: { name: "status", value: "found" } })}
          className={`flex items-center justify-center gap-1.5 rounded-full border py-2.5 text-xs font-semibold transition active:scale-[0.98] ${
            itemData.status === "found"
              ? "border-emerald-300 bg-emerald-50 text-emerald-700"
              : "border-slate-200 bg-white text-slate-500"
          }`}
        >
          <CheckCircle2 className="h-3.5 w-3.5" />
          I Found It
        </button>
      </div>
    </Field>

    <Field label="Item Name" required>
      <div className="relative">
        <ClipboardList className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          name="itemName"
          value={itemData.itemName}
          onChange={onChange}
          placeholder="e.g. Samsung Galaxy S22"
          className={`${inputCls} pl-10`}
        />
      </div>
    </Field>

    <Field label="Category" required>
      <select
        name="category"
        value={itemData.category}
        onChange={onChange}
        className={inputCls}
      >
        <option value="" disabled>Select a category</option>
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
    </Field>
  </div>
);

// ── Step 2: Details ──────────────────────────────────────────────────────────
const Step2 = ({ itemData, onChange }) => (
  <div className="space-y-5">
    <Field label="Description" required>
      <textarea
        name="itemDescription"
        value={itemData.itemDescription}
        onChange={onChange}
        rows={4}
        placeholder="Describe the item in detail — color, brand, markings, condition..."
        className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100"
      />
    </Field>

    <Field label="Location" required>
      <div className="relative">
        <MapPin className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          name="location"
          value={itemData.location}
          onChange={onChange}
          placeholder="e.g. Main Library, Block A"
          className={`${inputCls} pl-10`}
        />
      </div>
    </Field>

    <Field label={itemData.status === "lost" ? "Date Lost" : "Date Found"} required>
      <div className="relative">
        <Calendar className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          type="date"
          name="dateLostOrFound"
          value={itemData.dateLostOrFound}
          onChange={onChange}
          max={new Date().toISOString().split("T")[0]}
          className={`${inputCls} pl-10`}
        />
      </div>
    </Field>
  </div>
);

// ── Step 3: Photo ────────────────────────────────────────────────────────────
const Step3 = ({ preview, onPhotoChange, onRemove }) => (
  <div className="space-y-4">
    <p className="text-sm text-slate-500">
      A photo helps others identify the item faster. It's optional but recommended.
    </p>

    {preview ? (
      <div className="relative">
        <img
          src={preview}
          alt="Preview"
          className="w-full rounded-2xl border border-slate-200 object-cover aspect-[4/3]"
        />
        <button
          type="button"
          onClick={onRemove}
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-slate-900/70 text-white transition hover:bg-slate-900"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    ) : (
      <label className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 py-12 transition hover:border-indigo-300 hover:bg-indigo-50/40">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-100">
          <ImageIcon className="h-6 w-6 text-indigo-600" />
        </div>
        <div className="text-center">
          <p className="text-sm font-semibold text-slate-700">Tap to upload a photo</p>
          <p className="mt-0.5 text-xs text-slate-400">JPEG, PNG or WebP · Max 5MB</p>
        </div>
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={onPhotoChange}
        />
      </label>
    )}
  </div>
);

// ── Progress bar ─────────────────────────────────────────────────────────────
const Progress = ({ step, total }) => (
  <div className="flex items-center gap-2">
    {Array.from({ length: total }).map((_, i) => (
      <div
        key={i}
        className={`h-1 flex-1 rounded-full transition-all ${
          i < step ? "bg-indigo-600" : "bg-slate-200"
        }`}
      />
    ))}
  </div>
);

const STEPS = [
  { title: "What are you reporting?", subtitle: "Tell us what happened" },
  { title: "Add the details", subtitle: "Help others identify the item" },
  { title: "Add a photo", subtitle: "Optional but recommended" },
];

// ── Main page ─────────────────────────────────────────────────────────────────
const ReportPage = () => {
  const navigate = useNavigate();
  const { loading, createAnItem } = useItems();
  const { postType } = useItemType();
  const [step, setStep] = useState(1);
  const [preview, setPreview] = useState(null);
  const [itemData, setItemData] = useState({
    itemName: "", itemDescription: "", category: "",
    location: "", image: "", status: postType, dateLostOrFound: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setItemData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setItemData((prev) => ({ ...prev, image: file }));
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = () => {
    setItemData((prev) => ({ ...prev, image: "" }));
    setPreview(null);
  };

  const validateStep = () => {
    if (step === 1) {
      if (!itemData.status) { toast.error("Please select Lost or Found"); return false; }
      if (!itemData.itemName.trim()) { toast.error("Please enter the item name"); return false; }
      if (!itemData.category) { toast.error("Please select a category"); return false; }
    }
    if (step === 2) {
      if (!itemData.itemDescription.trim()) { toast.error("Please add a description"); return false; }
      if (!itemData.location.trim()) { toast.error("Please enter the location"); return false; }
      if (!itemData.dateLostOrFound) { toast.error("Please select a date"); return false; }
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep()) setStep((s) => s + 1);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    if (itemData.itemName) formData.append("itemName", itemData.itemName);
    if (itemData.itemDescription) formData.append("itemDescription", itemData.itemDescription);
    if (itemData.category) formData.append("category", itemData.category);
    if (itemData.image instanceof File) formData.append("image", itemData.image);
    if (itemData.location) formData.append("location", itemData.location);
    if (itemData.dateLostOrFound) formData.append("dateLostOrFound", itemData.dateLostOrFound);
    if (itemData.status) formData.append("status", itemData.status);

    try {
      await createAnItem(formData);
      toast.success("Report created successfully");
      navigate("/");
    } catch (error) {
      handleApiError(error, "Failed to create report. Please try again.");
    }
  };

  const current = STEPS[step - 1];

  return (
    <>
      {/* ══════════════════════════════════════════
          MOBILE wizard (hidden on lg+)
      ══════════════════════════════════════════ */}
      <div className="flex min-h-screen flex-col bg-white lg:hidden">
        {/* Header */}
        <div className="border-b border-slate-100 px-4 pb-4 pt-5">
          <div className="mb-4 flex items-center gap-3">
            <button type="button" onClick={() => step > 1 ? setStep((s) => s - 1) : navigate(-1)}
              className="flex h-9 w-9 items-center justify-center rounded-full text-slate-600 transition hover:bg-slate-100" aria-label="Back">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex-1"><Progress step={step} total={STEPS.length} /></div>
            <span className="text-xs font-semibold text-slate-400">{step}/{STEPS.length}</span>
          </div>
          <h1 className="font-display text-xl font-bold text-slate-900">{current.title}</h1>
          <p className="mt-0.5 text-sm text-slate-500">{current.subtitle}</p>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-5">
          {step === 1 && <Step1 itemData={itemData} onChange={handleInputChange} />}
          {step === 2 && <Step2 itemData={itemData} onChange={handleInputChange} />}
          {step === 3 && <Step3 preview={preview} onPhotoChange={handlePhotoChange} onRemove={handleRemovePhoto} />}
        </div>

        <div className="border-t border-slate-100 px-4 py-4">
          {step < STEPS.length ? (
            <button type="button" onClick={handleNext}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 py-3.5 text-sm font-semibold text-white shadow-sm transition active:scale-[0.98]">
              Continue <ChevronRight className="h-4 w-4" />
            </button>
          ) : (
            <button type="button" onClick={handleSubmit} disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 py-3.5 text-sm font-semibold text-white shadow-sm transition disabled:opacity-50 active:scale-[0.98]">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle2 className="h-4 w-4" />}
              {loading ? "Posting..." : "Post Report"}
            </button>
          )}
          {step === 3 && !loading && (
            <button type="button" onClick={handleSubmit}
              className="mt-3 w-full text-center text-sm text-slate-400 transition hover:text-slate-600">
              Skip photo and post
            </button>
          )}
        </div>
      </div>

      {/* ══════════════════════════════════════════
          DESKTOP single-form layout
      ══════════════════════════════════════════ */}
      <div className="hidden lg:block relative min-h-screen overflow-hidden bg-gradient-to-b from-slate-50 via-slate-100/60 to-white px-8 pb-10 pt-6">
        <div className="pointer-events-none absolute -left-20 top-10 h-52 w-52 rounded-full bg-violet-300/25 blur-3xl" />
        <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full bg-indigo-300/20 blur-3xl" />
        <div className="relative mx-auto w-full max-w-3xl">
          <section className="rounded-3xl border border-indigo-100 bg-[linear-gradient(135deg,#faf9ff_0%,#ede9fe_52%,#f8f7ff_100%)] px-8 py-9 shadow-[0_35px_90px_-65px_rgba(79,70,229,0.6)]">
            <img src="/iconplusfindoratext.png" alt="Findora" className="h-7 w-auto" />
            <h1 className="mt-3 font-display text-3xl font-bold leading-tight text-slate-900">
              Report {itemData.status === "lost" ? "Lost" : "Found"} Item
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-600">
              Provide accurate details so the community can match reports faster.
            </p>
          </section>

          <form className="mt-6 rounded-3xl border border-slate-200 bg-white/90 p-8 shadow-[0_30px_90px_-75px_rgba(15,23,42,0.8)]"
            onSubmit={(e) => e.preventDefault()}>
            {/* Item type */}
            <div className="mb-6">
              <label className="mb-3 block text-sm font-semibold text-slate-700">Item Type</label>
              <div className="grid grid-cols-2 gap-3">
                <button type="button" onClick={() => handleInputChange({ target: { name: "status", value: "lost" } })}
                  className={`flex items-center justify-center gap-2 rounded-xl border py-3 text-sm font-semibold transition ${itemData.status === "lost" ? "border-indigo-300 bg-indigo-50 text-indigo-700" : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"}`}>
                  <SearchX className="h-4 w-4" /> I Lost an Item
                </button>
                <button type="button" onClick={() => handleInputChange({ target: { name: "status", value: "found" } })}
                  className={`flex items-center justify-center gap-2 rounded-xl border py-3 text-sm font-semibold transition ${itemData.status === "found" ? "border-emerald-300 bg-emerald-50 text-emerald-700" : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"}`}>
                  <CheckCircle2 className="h-4 w-4" /> I Found an Item
                </button>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-slate-700">Item Name</label>
                <div className="relative">
                  <ClipboardList className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input type="text" name="itemName" value={itemData.itemName} onChange={handleInputChange} placeholder="e.g. Samsung Galaxy S22"
                    className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm text-slate-800 outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100" />
                </div>
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Category</label>
                <select name="category" value={itemData.category} onChange={handleInputChange}
                  className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-800 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100">
                  <option value="" disabled>Select category</option>
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
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  {itemData.status === "lost" ? "Date Lost" : "Date Found"}
                </label>
                <div className="relative">
                  <Calendar className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input type="date" name="dateLostOrFound" value={itemData.dateLostOrFound} onChange={handleInputChange}
                    max={new Date().toISOString().split("T")[0]}
                    className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm text-slate-800 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100" />
                </div>
              </div>
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-slate-700">Description</label>
                <textarea name="itemDescription" value={itemData.itemDescription} onChange={handleInputChange} rows={4}
                  placeholder="Describe the item in detail — color, brand, markings, condition..."
                  className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100" />
              </div>
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-slate-700">Location</label>
                <div className="relative">
                  <MapPin className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input type="text" name="location" value={itemData.location} onChange={handleInputChange} placeholder="e.g. Main Library, Block A"
                    className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm text-slate-800 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100" />
                </div>
              </div>
            </div>

            {/* Photo */}
            <div className="mt-5">
              <label className="mb-2 block text-sm font-semibold text-slate-700">Photo (optional)</label>
              {preview ? (
                <div className="relative">
                  <img src={preview} alt="Preview" className="w-full rounded-xl border border-slate-200 object-cover aspect-video" />
                  <button type="button" onClick={handleRemovePhoto}
                    className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-slate-900/70 text-white">
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <label className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 py-8 transition hover:border-indigo-300 hover:bg-indigo-50/40">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100">
                    <ImageIcon className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-semibold text-slate-700">Click to upload a photo</p>
                    <p className="mt-0.5 text-xs text-slate-400">JPEG, PNG or WebP · Max 5MB</p>
                  </div>
                  <input type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
                </label>
              )}
            </div>

            <button type="button" onClick={handleSubmit} disabled={loading}
              className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-indigo-700 text-sm font-bold text-white transition hover:bg-indigo-800 disabled:opacity-50">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle2 className="h-4 w-4" />}
              {loading ? "Posting..." : "Post Report"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ReportPage;
