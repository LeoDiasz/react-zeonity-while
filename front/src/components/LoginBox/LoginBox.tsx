import styles from "./styles.module.scss";
import {VscGithubInverted} from "react-icons/vsc";
import {useContext} from "react";
import {AuthContext} from "../../contexts/auth";

export function LoginBox() {

  const {signInUrl} = useContext(AuthContext);
  
  return (
    <div className={styles.loginContentWrapper}>
      <h1>Envie e compartilhe sua mensagem</h1>
      <a href={signInUrl} className={styles.signInWithGithub}>
        <VscGithubInverted  size="24"/>
        Entrar com github
      </a>
    </div>   
  )
}