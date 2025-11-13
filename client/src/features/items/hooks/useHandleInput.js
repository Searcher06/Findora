const handleInputChange = (e, setItemData) => {
  const { name, value } = e.target;
  setItemData((prev) => ({
    ...prev,
    [name]: value,
  }));
};
export default handleInputChange;
