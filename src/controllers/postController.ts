import { Request, Response } from "express";
import db from "../database.js";
import { RowDataPacket, ResultSetHeader } from "mysql2/promise";

export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const [rows] = await db.query<RowDataPacket[]>("SELECT * FROM posts");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch posts" });
  }
};

export const getPostById = async (req: Request, res: Response) => {
  try {
    const [rows] = await db.query<RowDataPacket[]>(
      "SELECT * FROM posts WHERE id = ?",
      [req.params.id]
    );
    if (!rows[0]) {
      res.status(404).json({ error: "Post not found" });
      return;
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch post" });
  }
};

export const createPost = async (req: Request, res: Response) => {
  try {
    const { title, content, user_id } = req.body;
    const [result] = await db.query<ResultSetHeader>(
      "INSERT INTO posts (title, content, user_id) VALUES (?, ?, ?)",
      [title, content, user_id]
    );
    res.status(201).json({ id: result.insertId, ...req.body });
  } catch (error) {
    res.status(500).json({ error: "Failed to create post" });
  }
};

export const updatePost = async (req: Request, res: Response) => {
  try {
    const { title, content, user_id } = req.body;
    await db.query(
      "UPDATE posts SET title = ?, content = ?, user_id = ? WHERE id = ?",
      [title, content, user_id, req.params.id]
    );
    res.json({ id: req.params.id, ...req.body });
  } catch (error) {
    res.status(500).json({ error: "Failed to update post" });
  }
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    await db.query("DELETE FROM posts WHERE id = ?", [req.params.id]);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete post" });
  }
};
