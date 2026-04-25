import { useUploadPhoto } from "../context/UploadPhotoContext";

const ToggleImage = () => {
  const { on, setOn } = useUploadPhoto();
  return (
    <div className="flex items-center gap-2">
      <p className="text-xs font-semibold text-slate-600">{on ? "On" : "Off"}</p>
      <button
        id="photo"
        name="photo"
        type="button"
        aria-pressed={on}
        className={`flex h-7 w-12 items-center rounded-full p-1 transition ${
          on ? "justify-end bg-emerald-500/60" : "justify-start bg-slate-300"
        }`}
        onClick={() => {
          setOn((prevState) => !prevState);
        }}
      >
        <div className="h-full w-1/2 rounded-full bg-white shadow-sm"></div>
      </button>
    </div>
  );
};

export default ToggleImage;
