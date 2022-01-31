import styles from "./styles.module.scss";

type MessageRequest = {
  id: string;
  text: string;
  user: {
    name: string;
    avatar_url: string;
  }
 }
 
 type MessageProps = {
   message: MessageRequest;
 }

export function Message(props: MessageProps ) {
  return (
    <li className={styles.message}>
      <p className={styles.messageText}>{props.message.text} </p>
      <div className={styles.messageUser}>
        <div className={styles.userImage}>
          <img src={props.message.user.avatar_url} alt={props.message.user.name} />
        </div>
        <span>{props.message.user.name}</span>
      </div>
    </li>
  )
}