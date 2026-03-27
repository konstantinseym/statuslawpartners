import styles from "./SubTextLine.module.css";

export default function SubTextLine({ children }) {
  return <span className={styles.subtextline}>{children}</span>;
}
