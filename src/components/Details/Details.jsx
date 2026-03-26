import styles from "./Details.module.css";
import TextLine from "../UI/TextLine/TextLine.jsx";

export default function Details({ details }) {
  return (
    <div className={styles.details}>
      <TextLine>{details}</TextLine>
    </div>
  );
}
