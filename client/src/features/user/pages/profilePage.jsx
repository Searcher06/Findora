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

// Example user data - in your app, this comes from useAuthStore
const mockUser = {
  _id: "69583626349568ab085513b9",
  firstName: "Ahmad",
  lastName: "Ibrahim",
  username: "searcher06",
  displayUsername: "searcher06",
  email: "ahmad@gmail.com",
  role: "student",
  createdAt: "2026-01-02T21:17:37.159Z",
  // department and foculty are undefined - they'll show "Add" cards
};

export default function ProfilePage() {
  const [user] = useState(mockUser);
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
    alert("Navigate to edit page or open modal here");
  };

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
          className="group bg-white rounded-xl border-2 border-dashed border-gray-300 p-5 hover:border-blue-400 hover:bg-blue-50/30 transition-all duration-200 cursor-pointer"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 rounded-full bg-gray-300"></div>
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              {title}
            </h4>
          </div>
          <div className="flex items-center gap-4">
            <div className="p-2.5 bg-gray-100 rounded-lg">
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
        className={`group bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-all duration-200 hover:${colors.border}`}
      >
        <div className="flex items-center gap-2 mb-3">
          <div className={`w-2 h-2 rounded-full ${colors.dot}`}></div>
          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            {title}
          </h4>
        </div>
        <div className="flex items-center gap-4">
          <div className={`p-2.5 ${colors.bg} rounded-lg shadow-sm`}>
            <Icon className={`w-4 h-4 ${colors.icon}`} />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">{value}</p>
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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="px-6 max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 mb-2">
            <div className="w-8 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
              Profile
            </h1>
          </div>
          <p className="text-gray-500 text-sm">
            Personal information and academic details
          </p>
        </div>

        {/* User Card */}
        <div className="mb-8 bg-gradient-to-br from-white to-gray-50 rounded-2xl border border-gray-100 p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 p-0.5">
                <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                  {user.profilePic ? (
                    <img
                      src={user.profilePic}
                      alt="Profile"
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <User className="w-7 h-7 text-indigo-600" />
                  )}
                </div>
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-gray-900">
                {`${user.firstName} ${user.lastName}`}
              </h2>
              <p className="text-gray-500 text-sm font-medium">
                {`@${user.displayUsername}`}
              </p>
            </div>
            <div className="hidden sm:block text-xs font-medium text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full capitalize">
              {user.role} Account
            </div>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* ACADEMIC INFO Section */}
          <div className="space-y-5">
            <div className="flex items-center gap-3 px-1">
              <div className="p-2.5 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-sm">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Academic Info
                </h3>
                <p className="text-gray-400 text-xs mt-0.5">
                  University department & role
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <InfoCard
                icon={BookOpen}
                title="Department"
                value={user.department}
                subtitle="Department of Computing"
                color="blue"
                isEmpty={!user.department}
                onAdd={handleEditClick}
              />

              <InfoCard
                icon={GraduationCap}
                title="Faculty"
                value={user.foculty}
                subtitle="Faculty Information"
                color="green"
                isEmpty={!user.foculty}
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
          <div className="space-y-5">
            <div className="flex items-center gap-3 px-1">
              <div className="p-2.5 bg-gradient-to-br from-gray-700 to-gray-900 rounded-xl shadow-sm">
                <User className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Account Details
                </h3>
                <p className="text-gray-400 text-xs mt-0.5">
                  Personal account information
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="group bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-all duration-200 hover:border-gray-300">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-gray-600 to-gray-800"></div>
                  <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Email
                  </h4>
                </div>
                <div className="flex items-center gap-4">
                  <div className="p-2.5 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg shadow-sm">
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

              <div className="group bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-all duration-200 hover:border-orange-200">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-orange-500 to-amber-500"></div>
                  <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Member Since
                  </h4>
                </div>
                <div className="flex items-center gap-4">
                  <div className="p-2.5 bg-gradient-to-br from-orange-50 to-amber-100 rounded-lg shadow-sm">
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
            <div className="pt-4">
              <button
                onClick={handleEditClick}
                className="w-full group relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-semibold py-3 px-4 rounded-xl hover:shadow-lg transition-all duration-300 hover:from-blue-700 hover:to-indigo-700"
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
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
