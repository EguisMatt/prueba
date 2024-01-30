import { Request, Response} from 'express';
import {pool} from "../config/dbconfig"
import { RowDataPacket, ResultSetHeader } from 'mysql2';
export const getEmployees = async (req : Request, res: Response) => {
  try {
    const [row] = await pool.query(
      "SELECT * FROM user"
    );
    res.status(200).json({message: ""})
  } catch (error) {
    return res.status(500).json({
      message: "Error en el servidor",
    });
  }
};