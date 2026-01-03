export const useHandleInput = (setItemData) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setItemData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return handleInputChange;
};
