import React from "react";
import {
  User,
  Mail,
  Calendar,
  GraduationCap,
  BookOpen,
  Shield,
} from "lucide-react";

export const ProfilePage = () => {
  return (
    <div className="mt-14 px-6 max-w-5xl mx-auto">
      {/* Header with subtle gradient */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 mb-2">
          <div className="w-8 h-1 bg-linear-to-r from-blue-500 to-indigo-500 rounded-full"></div>
          <h1 className="text-2xl font-bold text-gray-900 sans display tracking-tight">
            Profile
          </h1>
        </div>
        <p className="text-gray-500 text-sm sans">
          Personal information and academic details
        </p>
      </div>

      {/* User Card with elegant design */}
      <div className="mb-8 bg-linear-to-br from-white to-gray-50 rounded-2xl border border-gray-100 p-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-linear-to-br from-blue-500 to-indigo-500 p-0.5">
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                <User className="w-7 h-7 text-indigo-600" />
              </div>
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-gray-900 sans display">
              Alex Thompson
            </h2>
            <p className="text-gray-500 text-sm sans font-medium">
              @athompson_99
            </p>
          </div>
          <div className="hidden sm:block text-xs font-medium text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full sans">
            Student Account
          </div>
        </div>
      </div>

      {/* Info Grid with elevated cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ACADEMIC INFO Section */}
        <div className="space-y-5">
          <div className="flex items-center gap-3 px-1">
            <div className="p-2.5 bg-linear-to-br from-blue-500 to-blue-600 rounded-xl shadow-sm">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 sans display">
                Academic Info
              </h3>
              <p className="text-gray-400 text-xs sans mt-0.5">
                University department & role
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="group bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-all duration-200 hover:border-blue-200">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full bg-linear-to-r from-blue-500 to-cyan-500"></div>
                <h4 className="text-xs font-semibold text-gray-500 sans uppercase tracking-wider">
                  Department
                </h4>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-2.5 bg-linear-to-br from-blue-50 to-blue-100 rounded-lg shadow-sm">
                  <BookOpen className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 sans">
                    Computer Science & AI
                  </p>
                  <p className="text-gray-400 text-xs sans mt-0.5">
                    Department of Computing
                  </p>
                </div>
              </div>
            </div>

            <div className="group bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-all duration-200 hover:border-green-200">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full bg-linear-to-r from-green-500 to-emerald-500"></div>
                <h4 className="text-xs font-semibold text-gray-500 sans uppercase tracking-wider">
                  Faculty
                </h4>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-2.5 bg-linear-to-br from-green-50 to-emerald-100 rounded-lg shadow-sm">
                  <GraduationCap className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 sans">
                    Engineering
                  </p>
                  <p className="text-gray-400 text-xs sans mt-0.5">
                    Faculty of Technology
                  </p>
                </div>
              </div>
            </div>

            <div className="group bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-all duration-200 hover:border-purple-200">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full bg-linear-to-r from-purple-500 to-violet-500"></div>
                <h4 className="text-xs font-semibold text-gray-500 sans uppercase tracking-wider">
                  Role
                </h4>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-2.5 bg-linear-to-br from-purple-50 to-violet-100 rounded-lg shadow-sm">
                  <Shield className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 sans">
                    Undergraduate Student
                  </p>
                  <p className="text-gray-400 text-xs sans mt-0.5">
                    Year 3, Semester 5
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ACCOUNT DETAILS Section */}
        <div className="space-y-5">
          <div className="flex items-center gap-3 px-1">
            <div className="p-2.5 bg-linear-to-br from-gray-700 to-gray-900 rounded-xl shadow-sm">
              <User className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 sans display">
                Account Details
              </h3>
              <p className="text-gray-400 text-xs sans mt-0.5">
                Personal account information
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="group bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-all duration-200 hover:border-gray-300">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full bg-linear-to-r from-gray-600 to-gray-800"></div>
                <h4 className="text-xs font-semibold text-gray-500 sans uppercase tracking-wider">
                  Email
                </h4>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-2.5 bg-linear-to-br from-gray-50 to-gray-100 rounded-lg shadow-sm">
                  <Mail className="w-4 h-4 text-gray-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 sans truncate">
                    alex.thompson@university.edu
                  </p>
                  <p className="text-gray-400 text-xs sans mt-0.5">
                    Primary email address
                  </p>
                </div>
              </div>
            </div>

            <div className="group bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-all duration-200 hover:border-orange-200">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full bg-linear-to-r from-orange-500 to-amber-500"></div>
                <h4 className="text-xs font-semibold text-gray-500 sans uppercase tracking-wider">
                  Member Since
                </h4>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-2.5 bg-linear-to-br from-orange-50 to-amber-100 rounded-lg shadow-sm">
                  <Calendar className="w-4 h-4 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 sans">
                    October 2023
                  </p>
                  <p className="text-gray-400 text-xs sans mt-0.5">
                    1 year, 2 months
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced action button */}
          <div className="pt-4">
            <button className="w-full group relative overflow-hidden bg-linear-to-r from-blue-600 to-indigo-600 text-white text-sm font-semibold py-3 px-4 rounded-xl hover:shadow-lg transition-all duration-300 hover:from-blue-700 hover:to-indigo-700 sans">
              <span className="relative z-10 flex items-center justify-center gap-2">
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

      {/* Subtle footer */}
      <div className="mt-8 pt-6 border-t border-gray-100 text-center">
        <p className="text-gray-400 text-xs sans">
          Last updated: Today at 2:30 PM •
          <span className="text-gray-300 mx-2">•</span>
          ID: #STU-2023-CS-0456
        </p>
      </div>
    </div>
  );
};
