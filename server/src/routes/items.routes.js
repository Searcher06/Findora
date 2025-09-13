import express from "express";
import authMiddleWare from "../middleware/auth.js";
import { ownerShipMiddleware } from "../middleware/itemOwnership.js";
import {
  createItem,
  updateItem,
  lostItems,
  foundItems,
  deleteItem,
} from "../controllers/item.controllers.js";
const router = express.Router();

/* 
router.delete("/:id")
 Delete an item from the DB using its ID when status == "returned"
*/

router.post("/", authMiddleWare, createItem);
router.patch("/:id", authMiddleWare, ownerShipMiddleware, updateItem); // requires an ownership middleware
router.get("/lost", authMiddleWare, lostItems);
router.get("/found", authMiddleWare, foundItems);
router.delete("/:id", authMiddleWare, ownerShipMiddleware, deleteItem); // requires an ownership middleware

export default router;
