import { io } from "../../app";
import {prismaClient} from "../../prismaClient/prismaClient";
import {AppError} from "../../errors/appError"

type IMessageRequest = {
  text: string;
  user_id: string;
}
export class CreateMessageServices {
  async service({text, user_id}: IMessageRequest ) {
    
    if(!text) {
      throw new AppError("Necessary to write something")
    }
    
    const messageResponse = await prismaClient.message.create({
      data: {
        text,
        user_id
      },
      include: {
        user: true
      }
    });

    io.emit("newMessage" , {messageResponse});
    
    return messageResponse;
  }
}