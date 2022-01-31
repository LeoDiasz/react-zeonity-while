import {Request, Response} from "express";
import { AuthenticateUserGitServices } from "../../services/user/authenticateUserGitServices";
import {AppError} from "../../errors/appError"

export class AuthenticateUserGitController {
  async execute(request: Request, response: Response) {
    const {code} = request.body;
    
    const authenticateServices = new AuthenticateUserGitServices();
    
    try { 
      const resultService = await authenticateServices.service(code);
      return response.status(200).json(resultService);
    }catch(err) {
      throw new AppError(err.message)
    }
   
  }
}