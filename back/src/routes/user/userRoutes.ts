import {Router} from "express";
import { AuthenticateUserGitController } from "../../controller/user/authenticateUserGitController";
import { GetUserProfileController } from "../../controller/user/getUserProfileController";
import {ensureAuthenticated} from "../../middlewares/ensureAuthenticated"

export const userRoutes = Router();


userRoutes.post("/authenticate", new AuthenticateUserGitController().execute);

userRoutes.get("/profile", ensureAuthenticated, new GetUserProfileController().execute)

