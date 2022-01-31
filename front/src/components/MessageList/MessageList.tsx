import { useEffect, useState } from "react";
import { api } from "../../services/api";
import styles from "./styles.module.scss";
import {Message} from "../Message/Message";
import logoImg  from "../../assets/logo.svg";
import io from "socket.io-client";

type MessageRequest = {
 id: string;
 text: string;
 user: {
   name: string;
   avatar_url: string;
 }
}

const socket = io("http://localhost:4000")





export function MessageList() {

  socket.on("newMessage", (newMessage: {}) =>  {
    setMessageRegister(newMessage)    
  })

  const [messageRegister, setMessageRegister] = useState({})

  const [messages, setMessages] = useState<MessageRequest[]>([]);
  
  useEffect(() => {
    api.get<MessageRequest[]>("message/lastthree").then((response) => {
      setMessages(response.data);
    })
  }, [messageRegister]);



  return (
    <div className={styles.messageListContentWrapper}>
      <img src={logoImg} alt="Logo ZeonityWhile" />
      <ul className={styles.messageList}>
          {messages.map((message) => (
            <Message key={message.id} message={message}/>
          ))}
      </ul>
    </div>
  )
}