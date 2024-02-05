"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const config_1 = require("./config/config");
const post_router_1 = require("./routes/post.router");
const get_router_1 = require("./routes/get.router");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.listen(config_1.PORT, () => {
    console.log(`server is running on PORT ${config_1.PORT}`);
});
app.use("/api", post_router_1.postrouter, get_router_1.getrouter);
