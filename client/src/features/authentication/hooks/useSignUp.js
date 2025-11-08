import { toast } from "react-toastify";
import { validateEmail } from "@/utils/validateEmail";
import { textValidator } from "@/utils/textValidator";
const useSingUp = ({ formData }) => {
  formData.firstName = formData.firstName.trim();
  formData.lastName = formData.firstName.trim();
  formData.email = formData.firstName.trim();
  formData.username = formData.firstName.trim();
  // checking all the fields
  if (
    !formData.firstName ||
    !formData.lastName ||
    !formData.email ||
    !formData.password ||
    !formData.username
  ) {
    toast.error("Please add all fields");
    return;
  }

  // checking the password length
  if (formData.password.length < 6) {
    toast.error("Password must be atleast 6 characters");
    return;
  }

  // checking the firstname length
  if (formData.firstName.length < 4) {
    toast.error("Firstname must be atleast 4 characters long");
    return;
  }

  // checking the lastname length
  if (formData.lastName.length < 4) {
    toast.error("Lastname must be atleast 4 characters long");
    return;
  }

  // checking the username length
  if (formData.username.length < 4) {
    toast.error("username must be atleast 4 characters long");
    return;
  }

  if (textValidator(formData.username)) {
    toast.error("Username can only contain letters and numbers");
    return;
  }

  if (!validateEmail(formData.email)) {
    toast.error("Please enter a valid email address");
    return;
  }
};

export { useSingUp };
