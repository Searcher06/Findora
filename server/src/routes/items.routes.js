import express from "express";
import authMiddleWare from "../middleware/auth.js";
import { ownerShipMiddleware } from "../middleware/itemOwnership.js";
import {
  createItem,
  updateItem,
  lostItems,
  foundItems,
  deleteItem,
  getUserItems,
  getUserPostsByUsername,
  getItemById,
  claimItem,
} from "../controllers/item.controllers.js";
import { itemOwner } from "../middleware/itemOwner.js";
const router = express.Router();

/* 
router.delete("/:id")
 Delete an item from the DB using its ID when status == "returned"
*/

router.get("/lost", authMiddleWare, lostItems);
router.get("/found", authMiddleWare, foundItems);
router.get("/user/:username", authMiddleWare, getUserPostsByUsername);

router
  .route("/")
  .post(authMiddleWare, createItem)
  .get(authMiddleWare, getUserItems);

router
  .route("/:id")
  .delete(authMiddleWare, ownerShipMiddleware, deleteItem)
  .patch(authMiddleWare, ownerShipMiddleware, updateItem)
  .get(authMiddleWare, getItemById);

router.post("/claim/:id", authMiddleWare, itemOwner, claimItem); // /api/v1/items/claim/68c8868991eead5cafc502ab -> creates and sends a claim request doc
export default router;
