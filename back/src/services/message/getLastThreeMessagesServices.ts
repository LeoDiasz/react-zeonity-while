import { prismaClient } from "../../prismaClient/prismaClient";
import { AppError } from "../../errors/appError";

export class GetLastThreeMessagesServices {
  async service() {

    const lastMessages = await prismaClient.message.findMany({
      take: 3,
      orderBy: {
        created_at: "desc"
      },
      include: {
        user: true,
      }
    });

   
    
    if (lastMessages.length <= 0) {
      throw new AppError("There is no message registered in the bank");
    }
    
    return lastMessages;
  }
}