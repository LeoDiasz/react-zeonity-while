import {Request, Response} from "express"
import { GetLastThreeMessagesServices } from "../../services/message/getLastThreeMessagesServices";

export class GetLastThreeMessagesController {
  async execute(request: Request, response: Response) {
    
    const lastMessagesServices = new GetLastThreeMessagesServices();

    const resultService = await lastMessagesServices.service();
    
    return response.status(200).json(resultService);
  }

}