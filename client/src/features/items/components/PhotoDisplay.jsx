import { useUploadPhoto } from "../context/UploadPhotoContext";
// import { usePhotoUpload } from "../hooks/usePhotoUpload";
const PhotoDisplay = ({ handlePhotoChange, preview }) => {
  const { on } = useUploadPhoto();
  // const { preview, handlePhotoChange } = usePhotoUpload(setItemData);
  return (
    on && (
      <div className="mt-3">
        <div
          className={`mb-3 flex h-48 w-full items-center justify-center overflow-hidden rounded-2xl border border-dashed border-slate-300 bg-slate-100 bg-center bg-cover sm:h-56`}
          style={{
            backgroundImage: `url(${preview ? preview : null})`,
          }}
        >
          {!preview ? (
            <p className="px-6 text-center text-sm text-slate-500">
              Add a clear photo to improve item identification.
            </p>
          ) : null}
        </div>
        <label htmlFor="photo-upload">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            id="photo-upload"
            onChange={handlePhotoChange}
          />
          <span className="inline-flex min-h-10 cursor-pointer items-center rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
            Upload new photo
          </span>
        </label>
      </div>
    )
  );
};

export default PhotoDisplay;
