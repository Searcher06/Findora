import { textValidator } from "../utils/symbolchecker.js";
import { itemModel } from "../models/item.model.js";
import { userModel } from "../models/user.model.js";
import cloudinary from "../config/cloudinary.js";
import mongoose from "mongoose";

const createItem = async (req, res) => {
  let {
    itemName,
    itemDescription,
    category,
    location,
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

  const submittedDate = new Date(dateLostOrFound);
  const currentDate = new Date();
  if (submittedDate > currentDate) {
    res.status(400);
    throw new Error(
      "Date cannot be in the future! Please select today or a past date"
    );
  }

  // Handle image if uploaded
  let imageUrl = null;
  const file = req.file;

  if (file) {
    // Validation checks first
    if (!file.mimetype.startsWith("image/")) {
      res.status(400);
      throw new Error("Uploaded file is not an image");
    }

    if (file.size > 5 * 1024 * 1024) {
      res.status(400);
      throw new Error("File size must be less than 5MB");
    }

    if (!file.buffer) {
      res.status(400);
      throw new Error("File data is corrupted");
    }

    // Upload to Cloudinary
    const base64 = file.buffer.toString("base64");
    const dataUri = `data:${file.mimetype};base64,${base64}`;

    const uploadResult = await cloudinary.uploader.upload(dataUri, {
      folder: "lost_found_items",
    });

    imageUrl = uploadResult.secure_url;
  }

  // Trim fields
  itemName = itemName.trim();
  itemDescription = itemDescription.trim();
  location = location.trim();

  // Create item
  const item = await itemModel.create({
    name: itemName,
    description: itemDescription,
    category: category,
    location,
    status,
    reportedBy: user._id,
    dateLostOrFound,
    image: imageUrl,
  });

  if (item) {
    res.status(201).json(item);
  } else {
    res.status(400);
    throw new Error("Invalid data");
  }
};
const updateItem = async (req, res) => {
  let {
    itemName,
    itemDescription,
    category,
    location,
    status,
    dateLostOrFound,
  } = req.body;

  const item = await itemModel.findById(req.item._id);

  // if item name is provided validate it and save
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

  // if item description is provided validate it and save
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

  const file = req.file;
  if (file) {
    // Validation checks first
    if (!file.mimetype.startsWith("image/")) {
      res.status(400);
      throw new Error("Uploaded file is not an image");
    }

    if (file.size > 5 * 1024 * 1024) {
      res.status(400);
      throw new Error("File size must be less than 5MB");
    }

    if (!file.buffer) {
      res.status(400);
      throw new Error("File data is corrupted");
    }

    // Upload to Cloudinary
    const base64 = file.buffer.toString("base64");
    const dataUri = `data:${file.mimetype};base64,${base64}`;

    const uploadResult = await cloudinary.uploader.upload(dataUri, {
      folder: "lost_found_items",
    });

    item.image = uploadResult.secure_url;
  }

  await item.save();
  const updatedItem = await itemModel.findById(item._id);
  res.status(200).json(updatedItem);
};
const deleteItem = async (req, res) => {
  // Checking if an item has been claimed before deletion
  const item = await itemModel.findById(req.item._id);
  if (item.status == "claimed") {
    res.status(403);
    throw new Error("Item can't be deleted, It has already been claimed");
  }

  const deletedItem = await itemModel.findByIdAndDelete(item.id);
  if (deletedItem) {
    res.status(200).json({ message: "Item deleted successfully" });
  } else {
    res.status(500);
    throw new Error("Item deletion failed!");
  }
};
const allItems = async (req, res) => {
  const { category, date } = req.query;
  const query = {};
  const now = new Date();
  let sortOption = { dateReported: -1 }; // Default to latest

  // console.log("Received query params:", { category, date }); // Debug log

  // Category filter - ONLY apply if category exists and is not "all"
  if (category && category !== "all") {
    query.category = category;
  }

  // Date handling
  if (date === "last7") {
    const sevenDaysAgo = new Date(now);
    sevenDaysAgo.setDate(now.getDate() - 7);
    query.dateReported = { $gte: sevenDaysAgo };
  } else if (date === "last30") {
    const thirtyDaysAgo = new Date(now);
    thirtyDaysAgo.setDate(now.getDate() - 30);
    query.dateReported = { $gte: thirtyDaysAgo };
  } else if (date === "oldest") {
    sortOption = { dateReported: 1 };
  }
  // 'latest' uses default sort (-1)

  // console.log("Final query:", query); // Debug log
  // console.log("Sort option:", sortOption); // Debug log

  const items = await itemModel.find(query).sort(sortOption);
  // console.log("Found items:", items.length); // Debug log

  res.status(200).json(items);
};
const lostItems = async (req, res) => {
  const items = await itemModel.find({ status: "lost" });
  res.status(200).json(items);
};
const foundItems = async (req, res) => {
  const items = await itemModel.find({ status: "found" });
  res.status(200).json(items);
};
const getUserItems = async (req, res) => {
  const user = await userModel.findById(req.user._id);
  const items = await itemModel.find({ reportedBy: user._id.toString() });
  res.status(200).json(items);
};
const getUserPostsByUsername = async (req, res) => {
  const { username } = req.params;
  const user = await userModel
    .findOne({ username: username })
    .select("-password");

  // checking if user does not exist
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  const items = await itemModel.find({ reportedBy: user._id.toString() });
  res.status(200).json(items);
};
const getItemById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400);
    throw new Error("Invalid item ID");
  }

  const item = await itemModel
    .findOne({ _id: id })
    .populate("reportedBy", "firstName lastName profilePic");

  if (!item) {
    res.status(404);
    throw new Error("Item not found!");
  }
  res.status(200).json(item);
};

export {
  createItem,
  updateItem,
  lostItems,
  foundItems,
  deleteItem,
  getUserItems,
  getUserPostsByUsername,
  getItemById,
  allItems,
};
