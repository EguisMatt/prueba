import { Request, Response } from "express";
import { pool } from "../config/dbconfig";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { User, Validation } from '../interfaces/user';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { SECRET_KEY } from "../config/config";
export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, phone, confirmPassword }: User = req.body;
    if (!name || !email || !password || !phone || !confirmPassword) {
      throw new Error(" missing fields ")
    }
    if (password !== confirmPassword) {
      throw new Error("passwords do not match");
    }

    const checkExistingUser = [name, email];
    const verifyExistingUser = 'SELECT * FROM users where name = ? OR email = ? ';

    const [existingUser] = await pool.query<RowDataPacket[]>(verifyExistingUser, checkExistingUser);
    if (existingUser.length > 0) {
      return res.status(422).json('The user or email already exists');
    }

    const saltRounds: number = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const insertQuery = 'INSERT INTO users(name,email,password,phone) VALUES(?,?,?,?)';
    const insertvalues = [name, email, hashedPassword, phone];

    const [result] = await pool.query<ResultSetHeader>(insertQuery, insertvalues);
    res.status(200).json({
      id: result.insertId,
      name,
      email,
      password,
      phone
    })
  } catch (error) {
    console.error('an error ocurred', error)
    res.status(500).json({ message: 'Server error' })
  }
}


export const login = async (req: Request, res: Response) => {
  try {
    const { email, password }: Validation = req.body;
    if (!email || !password) {
      throw new Error("Missing params");
    }

    const checkExistingUser = [email];
    const verifyExistingUser = 'SELECT * FROM users where email = ?';
    const [result] = await pool.query<RowDataPacket[]>(verifyExistingUser, checkExistingUser);

    if (result.length > 0) {
      const compassword = await bcrypt.compare(password, result[0].password);

      if (!compassword) {
        console.error('La clave secreta no está definida.');
        return res.status(500).json({ message: 'password incorrect' });
        } else {
          if (SECRET_KEY) {
            const token = jwt.sign({
              name: result[0].name,
              email: result[0].email
            }, SECRET_KEY, {
              expiresIn: '1h'
            });
            return res.status(200).json({ token });
        }
      }
    }else{
      res.status(401).json({message: "not found email"})
    }

    // El bloque catch se encuentra aquí para manejar errores específicos si ocurren
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: 'Error en el servidor' });
  }
};