import styles from "./Contacts.module.css";
import TextLine from "../UI/TextLine/TextLine.jsx";

export default function Contacts({ contacts }) {
  return (
    <div className={styles.contacts}>
      <TextLine style={{ marginBottom: "64px" }}>
        {contacts.majorCaption}
      </TextLine>

      {contacts.minorCaptions.map((minorCaption, index) => (
        <TextLine key={index} style={{ fontSize: "var(--fontsize-m)" }}>
          {minorCaption}
        </TextLine>
      ))}
    </div>
  );
}
