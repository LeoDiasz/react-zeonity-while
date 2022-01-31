import styles from "./app.module.scss";
import {LoginBox} from "./components/LoginBox/LoginBox";
import {MessageList} from "./components/MessageList/MessageList";
import {SendMessageForm} from "./components/SendMessageForm/SendMessageForm";
import {AuthContext} from "./contexts/auth";
import {useContext} from "react";




function App() {
  const {user} = useContext(AuthContext);
  
  return (
    <main className={`${styles.contentWrapper} ${user ? styles.contentSigned : ""}`}>
      <MessageList />
      {user ? <SendMessageForm /> : <LoginBox/>}
    </main>
  )
}

export default App
