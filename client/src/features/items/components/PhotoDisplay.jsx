import { useUploadPhoto } from "../context/UploadPhotoContext";
// import { usePhotoUpload } from "../hooks/usePhotoUpload";
const PhotoDisplay = ({ handlePhotoChange, preview }) => {
  const { on } = useUploadPhoto();
  // const { preview, handlePhotoChange } = usePhotoUpload(setItemData);
  return (
    on && (
      <div>
        <div
          className={`w-full h-42 mt-3 mb-2 flex bg-center bg-cover rounded-md`}
          style={{
            backgroundImage: `url(${preview ? preview : null})`,
          }}
        ></div>
        <label id="photo-upload">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            id="photo-upload"
            onChange={handlePhotoChange}
          />
          <span
            htmlFor="photo-upload"
            className="text-xs font-sans cursor-pointer border border-gray-300 px-4 py-1  rounded-md font-medium text-gray-700 hover:bg-gray-100 active:scale-95 inline-block"
          >
            Upload new photo
          </span>
        </label>
      </div>
    )
  );
};

export default PhotoDisplay;
