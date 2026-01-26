import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";

export const UserAvatar = ({ profilePic }) => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);

  // Function to get user initials
  const getUserInitials = () => {
    if (!user) return "AI";

    if (user.firstName && user.lastName) {
      return `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
    }

    if (user.firstName) {
      return user.firstName[0].toUpperCase();
    }

    if (user.username) {
      return user.username[0].toUpperCase();
    }

    return "AI";
  };

  // Function to get user name for alt text
  const getUserName = () => {
    if (!user) return "User";

    if (user.firstName && user.lastName) {
      return `${user.firstName} ${user.lastName}`;
    }

    if (user.firstName) {
      return user.firstName;
    }

    if (user.username) {
      return user.username;
    }

    return "User";
  };

  return (
    <div
      onClick={() => navigate("/profile")}
      className="shrink-0 relative cursor-pointer group"
    >
      {/* Avatar with ring and shadow matching chat styling */}
      <div className="size-10 rounded-full ring-2 ring-white shadow-md overflow-hidden bg-gray-100 group-hover:shadow-lg transition-all duration-200">
        {profilePic || user?.profilePic ? (
          <img
            src={profilePic || user?.profilePic}
            alt={`${getUserName()}'s profile`}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-blue-500 to-indigo-600">
            <span className="text-white font-semibold text-sm">
              {getUserInitials()}
            </span>
          </div>
        )}
      </div>

      {/* Active status indicator (optional) */}
      <div className="absolute -bottom-0.5 -right-0.5 size-3 rounded-full border-2 border-white bg-green-500" />
    </div>
  );
};
