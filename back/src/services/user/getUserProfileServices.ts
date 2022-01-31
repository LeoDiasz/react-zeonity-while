import { prismaClient } from "../../prismaClient/prismaClient";

export class GetUserProfileServices {
  async service(user_id: string) {

    const user = await prismaClient.user.findFirst({
      where: {
        id: user_id
      }
    })

    return user
  }
}