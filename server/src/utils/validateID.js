import mongoose from "mongoose";
export const validateId = (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return true;
  } else {
    return false;
  }
};
