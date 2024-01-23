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
exports.registerUser = void 0;
const dbconfig_1 = require("../config/dbconfig");
const bcrypt_1 = __importDefault(require("bcrypt"));
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, phone, confirmPassword } = req.body;
        if (!name || !email || !password || !phone || !confirmPassword) {
            throw new Error(" hacen falta campos ");
        }
        if (password !== confirmPassword) {
            throw new Error("passwords do not match");
        }
        const checkExistingUser = [name, email];
        const verifyExistingUser = 'SELECT * FROM users where name = ? OR email = ? ';
        const [existingUser] = yield dbconfig_1.pool.query(verifyExistingUser, checkExistingUser);
        if (existingUser.length > 0) {
            return res.status(422).json('The user or email already exists');
        }
        const saltRounds = 10;
        const hashedPassword = yield bcrypt_1.default.hash(password, saltRounds);
        const insertQuery = 'INSERT INTO users(name,email,password,phone) VALUES(?,?,?,?)';
        const insertvalues = [name, email, hashedPassword, phone];
        const [result] = yield dbconfig_1.pool.query(insertQuery, insertvalues);
        res.status(200).json({
            id: result.insertId,
            name,
            email,
            password,
            phone
        });
    }
    catch (error) {
        console.error('an error ocurred', error);
        res.status(500).json({ message: 'Server error' });
    }
});
exports.registerUser = registerUser;
