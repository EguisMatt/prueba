import { Request, Response } from "express";
import { pool } from "../config/dbconfig";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { User, Validation } from '../interfaces/user';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { SECRET_KEY, USER_PASS, USER_PWD } from "../config/config";
import nodemailer from "nodemailer"


export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, phone, confirmPassword }: User = req.body;
    if (!name || !email || !password || !phone || !confirmPassword) {
      throw new Error("missing fields 🥵🥵🥵");
    }

    if (typeof name!== 'string' || typeof(email) !== 'string' || typeof(password) !== 'string' || typeof(confirmPassword) !== 'string') {
      return res.status(422).json({ message: 'error al escribir el tipo de cada dato' });
    }

    if (name.trim() === "" || email.trim() === "" || password.trim() === "" || confirmPassword.trim() === "") {
      return res.status(400).json({ message: 'the field cannot contain spaces empty' });
    }

    const nameRegex = /^[a-zA-Z\s]+$/;
    if (!nameRegex.test(name)) {
      return res.status(422).json({ message: 'invalid characters in the "name" field' });
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@(?!.*\.camilo)[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return res.status(422).json({ message: 'invalid characters in the "email" field' });
    }

    if (password !== confirmPassword) {
      return res.status(401).json({ message: 'Passwords do not match' });
    }

    const checkExistingUser = [email];
    const verifyExistingUser = 'SELECT * FROM users where email = ?';
    const [existingUser] = await pool.query<RowDataPacket[]>(verifyExistingUser, checkExistingUser);
    if (existingUser.length > 0) {
      return res.status(409).json({ message: 'The email already exists' });
    }

    const enviarEmail = async () => {
      try {
        const config = {
          host: 'smtp.gmail.com',
          port: 587,
          auth: {
            user: USER_PWD,
            pass: USER_PASS
          }
        };

        const mensaje: any = {
          from: email,
          to: email,
          subject: 'Correo de prueba',
          text: `¡Hola! ${name}, ¿cómo estás? Bienvenido a la app de Matthew 🥵`
        };

        const transport = nodemailer.createTransport(config);
        const info = await transport.sendMail(mensaje);
        console.log(info);
      } catch (error) {
        console.error("Error al enviar el correo electrónico:", error);
        res.status(500).json({ error: error, message: 'server catch error' });
      }
    };

    await enviarEmail();

    const saltRounds: number = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const insertQuery = 'INSERT INTO users(name, email, password, phone) VALUES(?, ?, ?, ?)';
    const insertValues = [name, email, hashedPassword, phone];

    const [result] = await pool.query<ResultSetHeader>(insertQuery, insertValues);
    res.status(200).json({
      id: result.insertId,
      name,
      email,
      password,
      phone
    });
  } catch (error) {
    console.error('An error occurred', error);
    res.status(500).json({ message: 'Server error' });
  }
};


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
        return res.status(401).json({ message: 'password incorrect' });
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
      res.status(404).json({message: "not found email"})
    }

    // El bloque catch se encuentra aquí para manejar errores específicos si ocurren
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error en el servidor' });
  }
};