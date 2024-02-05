import { Request, Response} from 'express';
import {pool} from "../config/dbconfig"
import { RowDataPacket, ResultSetHeader } from 'mysql2';

export const getUsers = async (req : Request, res: Response) => {
  try {
    const [row] = await pool.query(
      "SELECT * FROM users"
    );
    res.status(200).json(row);
  } catch (error) {
    return res.status(500).json({
      message: "Error en el servidor",
    });
  }
};