/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import {
  User,
  Mail,
  Calendar,
  GraduationCap,
  BookOpen,
  Shield,
  Loader2,
  Edit2,
  Plus,
} from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { useNavigate } from "react-router-dom";

export function ProfilePage() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const isCheckingAuth = useAuthStore((state) => state.isCheckingAuth);
  const [isEditing, setIsEditing] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  };

  const calculateMembershipDuration = (dateString) => {
    const created = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - created);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const years = Math.floor(diffDays / 365);
    const months = Math.floor((diffDays % 365) / 30);

    if (years > 0) {
      return `${years} year${years > 1 ? "s" : ""}, ${months} month${months !== 1 ? "s" : ""}`;
    }
    return `${months} month${months !== 1 ? "s" : ""}`;
  };

  const handleEditClick = () => {
    setIsEditing(true);
    navigate("/profile/edit");
  };

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-12 h-12 animate-spin text-blue-500" />
      </div>
    );
  }

  const InfoCard = ({
    icon: Icon,
    title,
    value,
    subtitle,
    color,
    isEmpty,
    onAdd,
  }) => {
    if (isEmpty) {
      return (
        <div
          onClick={onAdd}
          className="group bg-white rounded-xl border-2 border-dashed border-gray-300 p-4 sm:p-5 hover:border-blue-400 hover:bg-blue-50/30 transition-all duration-200 cursor-pointer"
        >
          <div className="flex items-center gap-2 mb-2 sm:mb-3">
            <div className="w-2 h-2 rounded-full bg-gray-300"></div>
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              {title}
            </h4>
          </div>
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="p-2 sm:p-2.5 bg-gray-100 rounded-lg shrink-0">
              <Plus className="w-4 h-4 text-gray-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Add {title}</p>
              <p className="text-gray-400 text-xs mt-0.5">
                Click to add information
              </p>
            </div>
          </div>
        </div>
      );
    }

    const colorMap = {
      blue: {
        border: "border-blue-200",
        dot: "bg-blue-500",
        bg: "bg-blue-50",
        icon: "text-blue-600",
      },
      green: {
        border: "border-green-200",
        dot: "bg-green-500",
        bg: "bg-green-50",
        icon: "text-green-600",
      },
      purple: {
        border: "border-purple-200",
        dot: "bg-purple-500",
        bg: "bg-purple-50",
        icon: "text-purple-600",
      },
    };

    const colors = colorMap[color] || colorMap.blue;

    return (
      <div
        className={`group bg-white rounded-xl border border-gray-200 p-4 sm:p-5 hover:shadow-md transition-all duration-200 hover:${colors.border}`}
      >
        <div className="flex items-center gap-2 mb-2 sm:mb-3">
          <div className={`w-2 h-2 rounded-full ${colors.dot}`}></div>
          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            {title}
          </h4>
        </div>
        <div className="flex items-center gap-3 sm:gap-4">
          <div
            className={`p-2 sm:p-2.5 ${colors.bg} rounded-lg shadow-sm shrink-0`}
          >
            <Icon className={`w-4 h-4 ${colors.icon}`} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-gray-900 truncate">
              {value}
            </p>
            {subtitle && (
              <p className="text-gray-400 text-xs mt-0.5">{subtitle}</p>
            )}
          </div>
        </div>
      </div>
    );
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-700">No User Found</h2>
          <p className="text-gray-500 mt-2">Please log in to continue</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8 mt-12">
      <div className="px-4 sm:px-6 max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 mb-2">
            <div className="w-6 sm:w-8 h-1 bg-linear-to-r from-blue-500 to-indigo-500 rounded-full"></div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
              Profile
            </h1>
          </div>
          <p className="text-gray-500 text-xs sm:text-sm">
            Personal information and academic details
          </p>
        </div>

        {/* User Card */}
        <div className="mb-6 sm:mb-8 bg-linear-to-br from-white to-gray-50 rounded-xl sm:rounded-2xl border border-gray-100 p-4 sm:p-6 shadow-sm">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="relative">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-linear-to-br from-blue-500 to-indigo-500 p-0.5">
                <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                  {user.profilePic ? (
                    <img
                      src={user.profilePic}
                      alt="Profile"
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <User className="w-6 h-6 sm:w-7 sm:h-7 text-indigo-600" />
                  )}
                </div>
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full"></div>
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 truncate">
                {`${user.firstName} ${user.lastName}`}
              </h2>
              <p className="text-gray-500 text-xs sm:text-sm font-medium truncate">
                {`@${user.displayUsername}`}
              </p>
            </div>
            <div className="hidden sm:block text-xs font-medium text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full capitalize shrink-0">
              {user.role} Account
            </div>
          </div>
          {/* Mobile role badge */}
          <div className="sm:hidden mt-3 pt-3 border-t border-gray-100">
            <div className="inline-block text-xs font-medium text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full capitalize">
              {user.role} Account
            </div>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* ACADEMIC INFO Section */}
          <div className="space-y-4 sm:space-y-5">
            <div className="flex items-center gap-2 sm:gap-3 px-1">
              <div className="p-2 sm:p-2.5 bg-linear-to-br from-blue-500 to-blue-600 rounded-lg sm:rounded-xl shadow-sm">
                <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                  Academic Info
                </h3>
                <p className="text-gray-400 text-xs mt-0.5">
                  University department & role
                </p>
              </div>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <InfoCard
                icon={BookOpen}
                title="Department"
                value={user.department}
                subtitle="Department Information"
                color="blue"
                isEmpty={!user.department || user.department === ""}
                onAdd={handleEditClick}
              />

              <InfoCard
                icon={GraduationCap}
                title="Faculty"
                value={user.foculty}
                subtitle="Faculty Information"
                color="green"
                isEmpty={!user.foculty || user.foculty === ""}
                onAdd={handleEditClick}
              />

              <InfoCard
                icon={Shield}
                title="Role"
                value={user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                subtitle={`${user.role === "student" ? "Undergraduate" : "Academic"} Member`}
                color="purple"
                isEmpty={false}
              />
            </div>
          </div>

          {/* ACCOUNT DETAILS Section */}
          <div className="space-y-4 sm:space-y-5">
            <div className="flex items-center gap-2 sm:gap-3 px-1">
              <div className="p-2 sm:p-2.5 bg-linear-to-br from-gray-700 to-gray-900 rounded-lg sm:rounded-xl shadow-sm">
                <User className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                  Account Details
                </h3>
                <p className="text-gray-400 text-xs mt-0.5">
                  Personal account information
                </p>
              </div>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <div className="group bg-white rounded-xl border border-gray-200 p-4 sm:p-5 hover:shadow-md transition-all duration-200 hover:border-gray-300">
                <div className="flex items-center gap-2 mb-2 sm:mb-3">
                  <div className="w-2 h-2 rounded-full bg-linear-to-r from-gray-600 to-gray-800"></div>
                  <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Email
                  </h4>
                </div>
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="p-2 sm:p-2.5 bg-linear-to-br from-gray-50 to-gray-100 rounded-lg shadow-sm shrink-0">
                    <Mail className="w-4 h-4 text-gray-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">
                      {user.email}
                    </p>
                    <p className="text-gray-400 text-xs mt-0.5">
                      Primary email address
                    </p>
                  </div>
                </div>
              </div>

              <div className="group bg-white rounded-xl border border-gray-200 p-4 sm:p-5 hover:shadow-md transition-all duration-200 hover:border-orange-200">
                <div className="flex items-center gap-2 mb-2 sm:mb-3">
                  <div className="w-2 h-2 rounded-full bg-linear-to-r from-orange-500 to-amber-500"></div>
                  <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Member Since
                  </h4>
                </div>
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="p-2 sm:p-2.5 bg-linear-to-br from-orange-50 to-amber-100 rounded-lg shadow-sm shrink-0">
                    <Calendar className="w-4 h-4 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      {formatDate(user.createdAt)}
                    </p>
                    <p className="text-gray-400 text-xs mt-0.5">
                      {calculateMembershipDuration(user.createdAt)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Edit button */}
            <div className="pt-2 sm:pt-4">
              <button
                onClick={handleEditClick}
                className="w-full group relative overflow-hidden bg-linear-to-r from-blue-600 to-indigo-600 text-white text-sm font-semibold py-2.5 sm:py-3 px-4 rounded-lg sm:rounded-xl hover:shadow-lg transition-all duration-300 hover:from-blue-700 hover:to-indigo-700"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <Edit2 className="w-4 h-4" />
                  Edit Profile Settings
                  <svg
                    className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-linear-to-r from-blue-700 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
