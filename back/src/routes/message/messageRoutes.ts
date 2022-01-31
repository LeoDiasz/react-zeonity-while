import {Router} from "express";
import {CreateMessageController} from "../../controller/message/createMessageController";
import {GetLastThreeMessagesController} from "../../controller/message/getLastThreeMessagesController";

import { ensureAuthenticated } from "../../middlewares/ensureAuthenticated";


export const messageRoutes = Router();


messageRoutes.post("/message", ensureAuthenticated,  new CreateMessageController().execute);

messageRoutes.get("/message/lastthree", new GetLastThreeMessagesController().execute);

