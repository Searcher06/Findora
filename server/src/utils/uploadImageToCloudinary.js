import cloudinary from "../config/cloudinary.js";

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const isTimeoutError = (error) => {
  return (
    error?.name === "TimeoutError" ||
    error?.http_code === 499 ||
    String(error?.message || "").toLowerCase().includes("timeout")
  );
};

const uploadBufferOnce = (buffer, options = {}) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        resource_type: "image",
        timeout: 120000,
        ...options,
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );

    stream.end(buffer);
  });
};

export const uploadImageToCloudinary = async (buffer, options = {}) => {
  const maxRetries = 2;
  let attempt = 0;

  while (attempt <= maxRetries) {
    try {
      return await uploadBufferOnce(buffer, options);
    } catch (error) {
      const canRetry = isTimeoutError(error) && attempt < maxRetries;
      if (!canRetry) throw error;
      attempt += 1;
      await wait(400 * attempt);
    }
  }
};

export const getCloudinaryUploadErrorMessage = (error) => {
  if (isTimeoutError(error)) {
    return "Image upload timed out. Please try again with a smaller image or better network.";
  }

  return "Image upload failed. Please try again.";
};
