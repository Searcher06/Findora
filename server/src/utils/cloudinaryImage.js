import cloudinary from "../config/cloudinary.js";

export const extractCloudinaryPublicId = (imageUrl) => {
  if (!imageUrl || typeof imageUrl !== "string") return null;

  try {
    const url = new URL(imageUrl);
    const uploadMarker = "/upload/";
    const uploadIndex = url.pathname.indexOf(uploadMarker);
    if (uploadIndex === -1) return null;

    let afterUpload = url.pathname.slice(uploadIndex + uploadMarker.length);
    // remove optional version segment like v12345/
    afterUpload = afterUpload.replace(/^v\d+\//, "");

    const withoutExtension = afterUpload.replace(/\.[^/.]+$/, "");
    return withoutExtension || null;
  } catch (_err) {
    return null;
  }
};

export const deleteCloudinaryImage = async ({ publicId, imageUrl }) => {
  const resolvedPublicId = publicId || extractCloudinaryPublicId(imageUrl);
  if (!resolvedPublicId) return false;

  const result = await cloudinary.uploader.destroy(resolvedPublicId, {
    resource_type: "image",
  });

  return result?.result === "ok" || result?.result === "not found";
};
