import styles from "./Contacts.module.css";
import TextLine from "../UI/TextLine/TextLine.jsx";

export default function Contacts({ contacts }) {
  return (
    <div className={styles.contacts}>
      <TextLine style={{ marginBottom: "64px" }}>{contacts}</TextLine>
      <TextLine style={{ fontSize: "1rem" }}>{contacts}</TextLine>
    </div>
  );
}
