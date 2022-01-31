import {Request, Response} from "express";
import { GetUserProfileServices } from "../../services/user/getUserProfileServices";

export class GetUserProfileController {
  async execute(request: Request, response: Response) {
    const {user_id} = request

    const profileServices = new GetUserProfileServices()

    const responseService = await profileServices.service(user_id)

    return response.status(200).json(responseService)
  }
}