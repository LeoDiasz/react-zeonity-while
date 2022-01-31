import styles from "./styles.module.scss";
import {VscGithubInverted, VscSignOut} from "react-icons/vsc";
import {api} from "../../services/api";
import {FormEvent, useState, useContext} from "react";
import {AuthContext} from "../../contexts/auth";
import {ResultMessage} from "../ResultMessage/ResultMessage";

export function SendMessageForm() {

  const [message, setMessage] = useState("");
  const [ativo, setAtivo] = useState(false);
  const {signOut, user} = useContext(AuthContext);

  async function sendMessage(event: FormEvent) {
    event.preventDefault();

    if (!message.trim()) {
      return;
    }
    
    await api.post("/message", {text: message});
    
    
    setAtivo(true);
    
    setMessage("");
    
    setTimeout(() => setAtivo(false), 3000);

  }

      
  return (
    <div className={styles.sendMessageFormContentWrapper}>
      {ativo ? <ResultMessage /> : ""}
      <button onClick={signOut} className={styles.signOutButton}>
          <VscSignOut size="32px"/>
      </button>
      
      <div className={styles.userInformation}>
        <div className={styles.userImage}>
          <img src={user?.avatar_url} alt={user?.name} />
        </div>
        <p className={styles.userName}>{user?.name}</p>

        <span className={styles.userGithub}>
          <VscGithubInverted size="16px"/>
          {user?.login}
        </span>
    
      </div>

      <form onSubmit={sendMessage} className={styles.sendMessageForm}>
        <label htmlFor="message">Mensagem</label>
        <textarea name="message"id="message" placeholder="Qual sua expectativa para o evento?" value={message} onChange= {event => setMessage(event.target.value)}required></textarea>
        
        <button type="submit">Enviar Mensagem</button>
      </form>

    </div>
  )
}