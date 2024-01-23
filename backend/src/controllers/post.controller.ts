import { Request, Response } from "express";
import { pool } from "../config/dbconfig";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { User } from '../interfaces/user';
import bcrypt from 'bcrypt'
export const registerUser = async (req: Request, res: Response) =>{
  try {
    const {name, email, password, phone, confirmPassword }: User = req.body;
    if (!name || !email || !password || !phone || !confirmPassword) {
      throw new Error(" hacen falta campos ")
    }
    if (password !== confirmPassword) {
      throw new Error("passwords do not match");
    }

    const checkExistingUser = [name, email];
    const verifyExistingUser = 'SELECT * FROM users where name = ? OR email = ? ';

    const [existingUser] = await pool.query<RowDataPacket[]>(verifyExistingUser, checkExistingUser);
    if(existingUser.length > 0){
      return res.status(422).json('The user or email already exists');
    }

    const saltRounds : number = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const insertQuery = 'INSERT INTO users(name,email,password,phone) VALUES(?,?,?,?)';
    const insertvalues = [name,email,hashedPassword,phone];

    const [result] = await pool.query<ResultSetHeader>(insertQuery,insertvalues);
    res.status(200).json({
      id: result.insertId,
      name,
      email,
      password,
      phone
    })
  } catch (error) {
    console.error('an error ocurred', error)
    res.status(500).json({message: 'Server error'})
  }
}