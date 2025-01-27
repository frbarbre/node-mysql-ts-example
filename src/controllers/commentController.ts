import { Request, Response } from "express";
import db from "../database.js";
import { RowDataPacket, ResultSetHeader } from "mysql2/promise";

export const getAllComments = async (req: Request, res: Response) => {
  try {
    const [rows] = await db.query<RowDataPacket[]>("SELECT * FROM comments");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch comments" });
  }
};

export const getCommentById = async (req: Request, res: Response) => {
  try {
    const [rows] = await db.query<RowDataPacket[]>(
      "SELECT * FROM comments WHERE id = ?",
      [req.params.id]
    );
    if (!rows[0]) {
      res.status(404).json({ error: "Comment not found" });
      return;
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch comment" });
  }
};

export const createComment = async (req: Request, res: Response) => {
  try {
    const { content, post_id } = req.body;
    const [result] = await db.query<ResultSetHeader>(
      "INSERT INTO comments (content, post_id) VALUES (?, ?)",
      [content, post_id]
    );
    res.status(201).json({ id: result.insertId, ...req.body });
  } catch (error) {
    res.status(500).json({ error: "Failed to create comment" });
  }
};

export const updateComment = async (req: Request, res: Response) => {
  try {
    const { content, post_id } = req.body;
    await db.query(
      "UPDATE comments SET content = ?, post_id = ? WHERE id = ?",
      [content, post_id, req.params.id]
    );
    res.json({ id: req.params.id, ...req.body });
  } catch (error) {
    res.status(500).json({ error: "Failed to update comment" });
  }
};

export const deleteComment = async (req: Request, res: Response) => {
  try {
    await db.query("DELETE FROM comments WHERE id = ?", [req.params.id]);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete comment" });
  }
};

export const getCommentsByPostId = async (req: Request, res: Response) => {
  try {
    const postId = req.params.id;
    const [rows] = await db.query<RowDataPacket[]>(
      "SELECT * FROM comments WHERE post_id = ?",
      [postId]
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch comments" });
  }
};
