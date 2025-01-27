import {
  createComment,
  deleteComment,
  getAllComments,
  getCommentById,
  getCommentsByPostId,
  updateComment,
} from "../controllers/commentController.js";
import express from "express";

const router = express.Router();

router.get("/", getAllComments);
router.get("/:id", getCommentById);
router.post("/", createComment);
router.put("/:id", updateComment);
router.delete("/:id", deleteComment);
router.get("/post/:id", getCommentsByPostId);

export default router;
