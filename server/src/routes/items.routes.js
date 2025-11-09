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
  allItems,
} from "../controllers/item.controller.js";
const router = express.Router();

/* 
router.delete("/:id")
 Delete an item from the DB using its ID when status == "returned"
*/

router.get("/lost", authMiddleWare, lostItems);
router.get("/found", authMiddleWare, foundItems);
router.get("/user/:username", authMiddleWare, getUserPostsByUsername);
router.get("/user", authMiddleWare, getUserItems);

router
  .route("/")
  .post(authMiddleWare, createItem)
  .get(authMiddleWare, allItems);
router
  .route("/:id")
  .delete(authMiddleWare, ownerShipMiddleware, deleteItem)
  .patch(authMiddleWare, ownerShipMiddleware, updateItem)
  .get(authMiddleWare, getItemById);

export default router;
