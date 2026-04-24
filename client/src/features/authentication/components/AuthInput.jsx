import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export const AuthInput = ({
  id,
  type = "text",
  label,
  placeholder,
  value,
  onChange,
  icon: Icon,
  disabled = false,
  autoComplete,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div>
      {label ? (
        <label htmlFor={id} className="mb-2 block text-sm font-semibold text-slate-700">
          {label}
        </label>
      ) : null}

      <div className="group flex h-12 w-full items-center rounded-xl border border-slate-200 bg-slate-50/60 px-3 transition focus-within:border-cyan-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-cyan-100">
        {Icon ? <Icon className="h-5 w-5 text-slate-400 transition group-focus-within:text-cyan-600" /> : null}
        <input
          id={id}
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          disabled={disabled}
          className="h-full w-full bg-transparent px-2 text-sm text-slate-800 outline-none placeholder:text-slate-400 disabled:cursor-not-allowed disabled:opacity-75"
        />

        {isPassword ? (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="rounded-md p-1 text-slate-500 transition hover:bg-slate-200 hover:text-slate-700"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        ) : null}
      </div>
    </div>
  );
};
