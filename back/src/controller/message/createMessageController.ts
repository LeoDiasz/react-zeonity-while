import {Request, Response} from "express";
import { CreateMessageServices } from "../../services/message/createMessageServices";
import {AppError} from "../../errors/appError"

export class CreateMessageController {
  async execute(request: Request, response: Response) {
    const {text} = request.body;
    const {user_id} = request;
    
    const messageServices = new CreateMessageServices();

    const resultService = await messageServices.service({text, user_id});
  
    return response.status(201).json(resultService);

  }
}