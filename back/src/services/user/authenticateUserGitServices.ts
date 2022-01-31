import {prismaClient} from "../../prismaClient/prismaClient";
import axios from "axios";
import {sign} from "jsonwebtoken";

type IAcessTokenResponse = {
  access_token: string;
}

type IDataUserResponse = {
  avatar_url: string;
  login: string;
  id: number;
  name: string;
}

export class AuthenticateUserGitServices {
  async service(code: string) {
    const url = "https://github.com/login/oauth/access_token";

    const {data: accessTokenResponse} = await axios.post<IAcessTokenResponse>(url, "", {
      params: {
          client_id: process.env.GIT_CLIENT_ID,
          client_secret: process.env.GIT_CLIENT_SECRET,
          code,
      },
      headers: {
        "Accept": "application/json",
      }
    });

    const {data: userResponse} = await axios.get<IDataUserResponse>("https://api.github.com/user", {
      headers: {
        authorization: `Bearer ${accessTokenResponse.access_token}`,
      }
    });

    let user = await prismaClient.user.findFirst({
      where: {
        github_id: userResponse.id,
      }
    });

    if(!user) {
      user = await prismaClient.user.create({
        data: {
          github_id: userResponse.id,
          login: userResponse.login,
          name: userResponse.name,
          avatar_url: userResponse.avatar_url,
        }
      });
    }


    const token = sign({
      user: {
        name: user.name,
        avatar_url: user.avatar_url,
        id: user.id
      }
    }, process.env.JWT_SECRET, {
      subject: user.id,
      expiresIn: "15m",
    });

    return {token, user};
  }
}