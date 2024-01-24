import {Router} from "express"
import * as postControllers from "../controllers/post.controller"

export const postrouter = Router()

postrouter.post('/register', postControllers.registerUser);
postrouter.post('/login', postControllers.login);