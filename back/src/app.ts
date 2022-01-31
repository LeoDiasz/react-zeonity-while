import express, {Request, Response, NextFunction} from "express";
import "express-async-errors";
import "dotenv/config";

import { Server } from "socket.io";
import http from "http";

import {AppError} from "./errors/appError"
import cors from "cors"

import {userRoutes} from "./routes/user/userRoutes";
import {messageRoutes} from "./routes/message/messageRoutes";


const app = express();


export const serverHttp = http.createServer(app);

export const io = new Server(serverHttp, {cors: {origin: "*"}});

app.use(express.json());
app.use(cors())

app.use(userRoutes);
app.use(messageRoutes);


app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  if(err instanceof AppError) {
    return response.status(err.status).json({error: err.message});
  }

  return response.status(500).json({error: "Internet Server Error"})

})