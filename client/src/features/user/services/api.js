import { Api2 } from "@/lib/axios";
export const updateProfile = async (updatedFields) => {
  const { data } = await Api2.post("/user/profile", updatedFields);
  console.log("Debug 0:", data);
  return data;
};
