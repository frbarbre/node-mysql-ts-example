import { Request, Response } from "express";
import db from "../database.js";
import { RowDataPacket, ResultSetHeader } from "mysql2/promise";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const [rows] = await db.query<RowDataPacket[]>("SELECT * FROM users");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const [rows] = await db.query<RowDataPacket[]>(
      "SELECT * FROM users WHERE id = ?",
      [req.params.id]
    );
    if (!rows[0]) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user" });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, mail, title, image } = req.body;
    const [result] = await db.query<ResultSetHeader>(
      "INSERT INTO users (name, mail, title, image) VALUES (?, ?, ?, ?)",
      [name, mail, title, image]
    );
    res.status(201).json({ id: result.insertId, ...req.body });
  } catch (error) {
    res.status(500).json({ error: "Failed to create user" });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { name, mail, title, image } = req.body;
    await db.query(
      "UPDATE users SET name = ?, mail = ?, title = ?, image = ? WHERE id = ?",
      [name, mail, title, image, req.params.id]
    );
    res.json({ id: req.params.id, ...req.body });
  } catch (error) {
    res.status(500).json({ error: "Failed to update user" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    await db.query("DELETE FROM users WHERE id = ?", [req.params.id]);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete user" });
  }
};
