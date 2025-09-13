import { textValidator } from "../utils/symbolchecker.js";
import { itemModel } from "../models/item.model.js";
import { userModel } from "../models/user.model.js";

const createItem = async (req, res) => {
  let {
    itemName,
    itemDescription,
    category,
    location,
    image,
    status,
    dateLostOrFound,
  } = req.body;

  const user = await userModel.findById(req.user._id).select("-password");
  if (!user) {
    res.status(404);
    throw new Error("User not found!");
  }

  // prettier-ignore
  if(!itemName || !itemDescription || !category || !location  || !status || !dateLostOrFound){
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

  if (textValidator(itemName)) {
    res.status(400);
    throw new Error("Item name can not contain special characters");
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

  // todo:build this later
  // checking if theres an image to upload to claudinary
  // if (image) {
  // }

  itemName = itemName.trim();
  itemDescription = itemDescription.trim();
  location = location.trim();

  const item = await itemModel.create({
    name: itemName,
    description: itemDescription,
    category: category,
    location,
    status,
    reportedBy: user._id,
    dateLostOrFound,
  });

  if (item) {
    res.status(201).json(item);
  } else {
    res.status(400);
    throw new Error("Invalid data");
  }
};

const updateItem = async (req, res) => {
  // Getting the item id from the request url, then checking the DB for the item
  const item = await itemModel.findById(req.params.id);

  // checking if item exists
  if (!item) {
    res.status(404);
    throw new Error("Item not found!");
  }

  // prettier-ignore

  // destructuring the all the fields
  let {
    itemName,
    itemDescription,
    category,
    location,
    image,
    status,
    dateLostOrFound,
  } = req.body;

  // if there item name is provided validate it and save
  if (itemName) {
    if (itemName.length < 3 || itemName.length > 25) {
      res.status(400);
      throw new Error(
        "Item name must be atlease 3 characters long, 25 characters max"
      );
    } else if (textValidator(itemName)) {
      res.status(400);
      throw new Error("Item name can not contain special characters");
    }
    itemName = itemName.trim();
    item.name = itemName;
  }

  // if there item description is provided validate it and save
  if (itemDescription) {
    if (itemDescription.length < 20 || itemDescription.length > 200) {
      res.status(400);
      throw new Error("Description must be between 20 to 200 characters");
    }
    itemDescription = itemDescription.trim();
    item.description = itemDescription;
  }

  if (category) {
    item.category = category;
  }

  if (location) {
    if (location.length < 3 || location.length > 150) {
      res.status(400);
      throw new Error("Location must be between 10 to 150 characters");
    } else if (textValidator(location)) {
      res.status(400);
      throw new Error("Location can not contain special characters");
    }

    location = location.trim();
    item.location = location;
  }

  // todo:implement image upload
  // if (image) {
  // }

  if (status) {
    item.status = status;
  }

  if (dateLostOrFound) {
    if (dateLostOrFound > Date.now()) {
      res.status(400);
      throw new Error("Invalid date!");
    }
    item.dateLostOrFound = dateLostOrFound;
  }

  await item.save();
  const updatedItem = await itemModel.findById(item._id);
  res.status(200).json(updatedItem);
};
const lostItems = async (req, res) => {};
const foundItems = async (req, res) => {};
const deleteItem = async (req, res) => {};

export { createItem, updateItem, lostItems, foundItems, deleteItem };
