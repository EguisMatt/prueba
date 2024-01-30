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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEmployees = void 0;
const dbconfig_1 = require("../config/dbconfig");
const getEmployees = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [row] = yield dbconfig_1.pool.query("SELECT * FROM user");
        res.status(200).json({ message: "" });
    }
    catch (error) {
        return res.status(500).json({
            message: "Error en el servidor",
        });
    }
});
exports.getEmployees = getEmployees;
