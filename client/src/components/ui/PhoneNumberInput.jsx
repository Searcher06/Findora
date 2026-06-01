import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

/**
 * @param {"default"|"auth"} variant
 *   "default" — gray-50 bg, green focus ring (edit profile)
 *   "auth"    — white bg, indigo focus ring, h-12 (sign up / auth forms)
 */
export const PhoneNumberInput = ({
  value,
  onChange,
  disabled,
  placeholder = "Enter phone number",
  variant = "default",
}) => (
  <PhoneInput
    international
    defaultCountry="NG"
    value={value || undefined}
    onChange={onChange}
    disabled={disabled}
    placeholder={placeholder}
    className={variant === "auth" ? "phone-input-auth" : "phone-input-default"}
  />
);
