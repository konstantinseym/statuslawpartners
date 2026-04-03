import styles from "./Caption.module.css";

export default function Caption({ children, style }) {
  return (
    <h2 className={styles.caption} style={style}>
      {children}
    </h2>
  );
}
