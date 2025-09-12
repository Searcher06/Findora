import { textValidator } from "../utils/symbolchecker";

const createItem = async (req, res) => {
  const {
    itemName,
    itemDescription,
    category,
    location,
    image,
    status,
    dateLostOrFound,
  } = req.body;

  // prettier-ignore
  if(!itemName || !itemDescription || !category || !location || !image || !status || !dateLostOrFound){
    res.status(400);
    throw new Error("Please add fields!")
  }

  if (itemName.length < 3 || itemName.length > 25) {
    res.status(400);
    throw new Error(
      "Item name must be atlease 3 characters long, 25 characters max"
    );
  }

  if (itemDescription.length < 20 || itemDescription.length > 200) {
    res.status(400);
    throw new Error("Description must be between 20 to 200 characters");
  }

  if (location.length < 3 || location.length > 150) {
    res.status(400);
    throw new Error("Location must be between 10 to 150 characters");
  } else if (textValidator(location)) {
    res.status(400);
    throw new Error("Location can not contain special characters");
  }

  if (dateLostOrFound > Date.now()) {
    res.status(400);
    throw new Error("Invalid date!");
  }

  // checking if theres an image to upload to claudinary
  if (image) {
  }
};

const updateItem = async (req, res) => {};
const lostItems = async (req, res) => {};
const foundItems = async (req, res) => {};
const deleteItem = async (req, res) => {};

export { createItem, updateItem, lostItems, foundItems, deleteItem };
