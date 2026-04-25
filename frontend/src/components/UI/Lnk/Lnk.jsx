import styles from "./Lnk.module.css";

export default function Lnk({ children, style, path }) {
  return (
    <a
      className={styles.lnk}
      style={style}
      href={path}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
}
