import { Router} from "express";

import * as getcontrollers from "../controllers/get.controller";

export const getrouter = Router()

getrouter.get('/getUsers', getcontrollers.getUsers)