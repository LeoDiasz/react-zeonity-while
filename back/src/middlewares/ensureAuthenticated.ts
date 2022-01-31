import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import {AppError} from "../errors/appError"

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {

  const tokenResponse = request.headers.authorization;

  if(!tokenResponse) {
    throw new AppError("Need to fill the token", 401);
  };
  
  const [, token] = tokenResponse.split(" ");
  
  try {
    const {sub} = verify(token, process.env.JWT_SECRET);

    request.user_id = sub as string ;

    next();
  } catch(err) {
    return response.status(401).json({error: err.message});
  };
  
}