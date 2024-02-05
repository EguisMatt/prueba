"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.registerUser = void 0;
const dbconfig_1 = require("../config/dbconfig");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = require("../config/config");
const nodemailer_1 = __importDefault(require("nodemailer"));
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, phone, confirmPassword } = req.body;
        if (!name || !email || !password || !phone || !confirmPassword) {
            return res.status(404).json({ message: "missing fields 🥵🥵🥵" });
        }
        if (typeof name !== 'string' || typeof (email) !== 'string' || typeof (password) !== 'string' || typeof (confirmPassword) !== 'string') {
            return res.status(422).json({ message: 'error al escribir el tipo de cada dato' });
        }
        if (name.trim() === "" || email.trim() === "" || password.trim() === "" || confirmPassword.trim() === "") {
            return res.status(400).json({ message: 'the field cannot contain spaces empty' });
        }
        const nameRegex = /^[a-zA-Z´áéíóú\s]+$/;
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
        const [existingUser] = yield dbconfig_1.pool.query(verifyExistingUser, checkExistingUser);
        if (existingUser.length > 0) {
            return res.status(409).json({ message: 'The email already exists' });
        }
        const enviarEmail = () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const config = {
                    host: 'smtp.gmail.com',
                    port: 587,
                    auth: {
                        user: config_1.USER_PWD,
                        pass: config_1.USER_PASS
                    }
                };
                const mensaje = {
                    from: email,
                    to: email,
                    subject: 'Correo de prueba',
                    text: `¡Hola! ${name}, ¿cómo estás? Bienvenido a la app de Matthew 🥵`
                };
                const transport = nodemailer_1.default.createTransport(config);
                const info = yield transport.sendMail(mensaje);
                console.log(info);
            }
            catch (error) {
                console.error("Error al enviar el correo electrónico:", error);
                res.status(500).json({ error: error, message: 'server catch error' });
            }
        });
        yield enviarEmail();
        const saltRounds = 10;
        const hashedPassword = yield bcrypt_1.default.hash(password, saltRounds);
        const insertQuery = 'INSERT INTO users(name, email, password, phone) VALUES(?, ?, ?, ?)';
        const insertValues = [name, email, hashedPassword, phone];
        const [result] = yield dbconfig_1.pool.query(insertQuery, insertValues);
        res.status(200).json({
            id: result.insertId,
            name,
            email,
            password,
            phone
        });
    }
    catch (error) {
        console.error('An error occurred', error);
        res.status(500).json({ message: 'Server error' });
    }
});
exports.registerUser = registerUser;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            throw new Error("Missing params");
        }
        const checkExistingUser = [email];
        const verifyExistingUser = 'SELECT * FROM users where email = ?';
        const [result] = yield dbconfig_1.pool.query(verifyExistingUser, checkExistingUser);
        if (result.length > 0) {
            const compassword = yield bcrypt_1.default.compare(password, result[0].password);
            if (!compassword) {
                console.error('contraseña incorrecta');
                return res.status(401).json({ message: 'password incorrect' });
            }
            else {
                if (config_1.SECRET_KEY) {
                    const token = jsonwebtoken_1.default.sign({
                        name: result[0].name,
                        email: result[0].email
                    }, config_1.SECRET_KEY, {
                        expiresIn: '1h'
                    });
                    return res.status(200).json({ token });
                }
            }
        }
        else {
            res.status(404).json({ message: "not found email" });
        }
        // El bloque catch se encuentra aquí para manejar errores específicos si ocurren
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error en el servidor' });
    }
});
exports.login = login;
