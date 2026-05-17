import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Lock, Loader2, ShieldCheck } from "lucide-react";
import { toast } from "react-toastify";
import { AuthShell } from "../components/AuthShell";
import { AuthInput } from "../components/AuthInput";
import { useAuthStore } from "@/store/useAuthStore";

export const ChangePasswordPage = () => {
  const navigate = useNavigate();
  const { changePassword, isChangingPassword } = useAuthStore();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("Please fill all fields");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("New password must be atleast 6 characters long");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const result = await changePassword({
      currentPassword,
      newPassword,
    });

    if (result) {
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      navigate("/profile");
    }
  };

  return (
    <AuthShell
      title="Change Password"
      subtitle="Update your password and keep your account secure."
      bottomNote="Changing password invalidates old sessions through token versioning."
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <AuthInput
          id="current-password"
          label="Current Password"
          type="password"
          placeholder="Enter current password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          icon={Lock}
          autoComplete="current-password"
          disabled={isChangingPassword}
        />

        <AuthInput
          id="new-password"
          label="New Password"
          type="password"
          placeholder="At least 6 characters"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          icon={Lock}
          autoComplete="new-password"
          disabled={isChangingPassword}
        />

        <AuthInput
          id="confirm-new-password"
          label="Confirm New Password"
          type="password"
          placeholder="Repeat new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          icon={Lock}
          autoComplete="new-password"
          disabled={isChangingPassword}
        />

        <button
          type="submit"
          disabled={isChangingPassword}
          className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-4 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition hover:from-indigo-700 hover:to-violet-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isChangingPassword ? <Loader2 className="h-5 w-5 animate-spin" /> : <ShieldCheck className="h-5 w-5" />}
          {isChangingPassword ? "Updating..." : "Change Password"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-600">
        Back to{" "}
        <Link to="/profile" className="font-semibold text-violet-700 hover:text-violet-800">
          Profile
        </Link>
      </p>
    </AuthShell>
  );
};
