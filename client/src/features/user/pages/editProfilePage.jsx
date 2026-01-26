import React, { useState, useEffect } from "react";
import {
  User,
  GraduationCap,
  BookOpen,
  Save,
  X,
  ArrowLeft,
  School,
  Camera,
  Upload,
} from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const EditProfilePage = () => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const isUpdating = useAuthStore((state) => state.isUpdating);
  const { UpdateProfile } = useAuthStore();

  const [formData, setFormData] = useState({
    department: "",
    foculty: "",
    profilePic: "",
  });
  const [previewImage, setPreviewImage] = useState("");

  // Initialize form data with user data
  useEffect(() => {
    if (user) {
      setFormData({
        department: user.department || "",
        foculty: user.foculty || "",
        profilePic: user.profilePic || "",
      });
      setPreviewImage(user.profilePic || "");
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [imageFile, setImageFile] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast.error("Please select a valid image file");
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }

      // Store the actual file for upload
      setImageFile(file);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        setFormData((prev) => ({
          ...prev,
          profilePic: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setPreviewImage("");
    setImageFile(null);
    setFormData((prev) => ({
      ...prev,
      profilePic: "",
    }));
  };

  const handleSubmit = async () => {
    if (!user) return;

    try {
      const formDataToSend = new FormData();

      // Append text fields
      formDataToSend.append("department", formData.department);
      formDataToSend.append("foculty", formData.foculty);

      // Append image file if a new one was selected
      if (imageFile) {
        formDataToSend.append("image", imageFile);
      }

      // Send to your API endpoint
      const response = await UpdateProfile(formDataToSend);
      if (response) {
        setTimeout(() => navigate("/profile"), 1000);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleCancel = () => {
    window.history.back();
  };

  const hasChanges =
    formData.department !== (user?.department || "") ||
    formData.foculty !== (user?.foculty || "") ||
    formData.profilePic !== (user?.profilePic || "");

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center mt-14">
        <div className="text-center">
          <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-700">No User Found</h2>
          <p className="text-gray-500 mt-2">Please log in to continue</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-14 px-4 sm:px-6 max-w-3xl mx-auto pb-8">
      {/* Fixed Header with Back Button */}
      <div className="mb-6 sm:mb-8">
        {/* Back button should align properly with content below */}
        <div className="mb-3 sm:mb-4">
          <button
            onClick={handleCancel}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors sans group"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:-translate-x-0.5" />
            <span className="text-sm sm:text-base font-medium">
              Back to Profile
            </span>
          </button>
        </div>

        {/* Title section - ensures proper alignment */}
        <div className="mt-2">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-1 bg-linear-to-r from-blue-500 to-indigo-500 rounded-full"></div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 sans display tracking-tight">
              Edit Profile
            </h1>
          </div>
          <p className="text-gray-500 text-sm sm:text-base sans">
            Update your profile photo and academic information
          </p>
        </div>
      </div>

      {/* Edit Form */}
      <div className="space-y-4 sm:space-y-6">
        {/* Profile Photo Section */}
        <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-200 p-4 sm:p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4 sm:mb-6">
            <div className="p-2 sm:p-2.5 bg-linear-to-br from-purple-500 to-purple-600 rounded-lg sm:rounded-xl shadow-sm">
              <Camera className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 sans">
                Profile Photo
              </h3>
              <p className="text-gray-400 text-xs sm:text-sm sans mt-0.5">
                Upload a new profile picture
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            {/* Profile Picture Preview */}
            <div className="relative shrink-0">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-linear-to-br from-blue-500 to-indigo-500 p-0.5">
                <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                  {previewImage ? (
                    <img
                      src={previewImage}
                      alt="Profile preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-6 h-6 sm:w-8 sm:h-8 text-indigo-600" />
                  )}
                </div>
              </div>
              {previewImage && (
                <button
                  onClick={handleRemoveImage}
                  className="absolute -top-1 -right-1 p-1 sm:p-1.5 bg-red-500 rounded-full text-white hover:bg-red-600 transition-all duration-200 hover:scale-105 shadow-md"
                  title="Remove photo"
                >
                  <X className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                </button>
              )}
            </div>

            {/* Upload Button */}
            <div className="flex-1 w-full">
              <label
                htmlFor="profilePic"
                className="group cursor-pointer block w-full"
              >
                <div className="border-2 border-dashed border-gray-300 rounded-lg sm:rounded-xl p-3 sm:p-4 text-center hover:border-blue-400 hover:bg-blue-50/30 transition-all duration-200">
                  <Upload className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 mx-auto mb-1 sm:mb-1.5 group-hover:text-blue-500 transition-colors" />
                  <p className="text-sm font-semibold text-gray-700 sans mb-0.5">
                    Click to upload
                  </p>
                  <p className="text-xs text-gray-500 sans">
                    PNG, JPG or WEBP (max. 5MB)
                  </p>
                </div>
                <input
                  type="file"
                  id="profilePic"
                  name="profilePic"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </div>

        {/* Academic Information Card */}
        <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-200 p-4 sm:p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4 sm:mb-6">
            <div className="p-2 sm:p-2.5 bg-linear-to-br from-blue-500 to-blue-600 rounded-lg sm:rounded-xl shadow-sm">
              <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 sans">
                Academic Information
              </h3>
              <p className="text-gray-400 text-xs sm:text-sm sans mt-0.5">
                Update your department and faculty
              </p>
            </div>
          </div>

          <div className="space-y-4 sm:space-y-5">
            {/* Department Field */}
            <div>
              <label
                htmlFor="department"
                className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2 sans"
              >
                <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600" />
                Department
              </label>
              <input
                type="text"
                id="department"
                name="department"
                value={formData.department}
                onChange={handleChange}
                placeholder="e.g., Computer Science & AI"
                className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-gray-50 border border-gray-200 rounded-lg sm:rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all sans text-sm"
              />
              <p className="text-xs text-gray-500 mt-1.5 ml-1 sans">
                {user.department
                  ? "Current department shown above"
                  : "Enter your department name"}
              </p>
            </div>

            {/* Faculty Field */}
            <div>
              <label
                htmlFor="foculty"
                className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2 sans"
              >
                <School className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-600" />
                Faculty
              </label>
              <input
                type="text"
                id="foculty"
                name="foculty"
                value={formData.foculty}
                onChange={handleChange}
                placeholder="e.g., Engineering"
                className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-gray-50 border border-gray-200 rounded-lg sm:rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all sans text-sm"
              />
              <p className="text-xs text-gray-500 mt-1.5 ml-1 sans">
                {user.foculty
                  ? "Current faculty shown above"
                  : "Enter your faculty name"}
              </p>
            </div>
          </div>
        </div>

        {/* User Info Reference */}
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 sm:p-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="flex items-center gap-3">
              <User className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-900 sans">
                  {`${user.firstName} ${user.lastName}`}
                </p>
                <p className="text-xs text-gray-500 sans mt-0.5">
                  {user.email}
                </p>
              </div>
            </div>
            <div className="text-xs font-medium text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full sans capitalize self-start sm:self-auto">
              {user.role}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            type="button"
            onClick={handleCancel}
            disabled={isUpdating}
            className="flex-1 px-4 py-2.5 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed sans text-sm"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isUpdating || !hasChanges}
            className="flex-1 group relative overflow-hidden bg-linear-to-r from-blue-600 to-indigo-600 text-white font-medium py-2.5 px-4 rounded-lg hover:shadow-md transition-all duration-300 hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none sans text-sm"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              {isUpdating ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Save Changes
                </>
              )}
            </span>
            {!isUpdating && (
              <div className="absolute inset-0 bg-linear-to-r from-blue-700 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            )}
          </button>
        </div>

        {/* Change Indicator */}
        {hasChanges && !isUpdating && (
          <p className="text-center text-xs text-amber-600 font-medium sans px-2">
            You have unsaved changes
          </p>
        )}
      </div>
    </div>
  );
};
