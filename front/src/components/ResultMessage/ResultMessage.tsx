import styles from "./styles.module.scss";

export function ResultMessage() {
  return (
    <div className={styles.resultMessageContentWrapper}>
        <p>Mensagem enviada com sucesso</p>
    </div>
  )
}