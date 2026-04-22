import Lnk from "../UI/Lnk/Lnk.jsx";

import styles from "./Ftr.module.css";

export default function Ftr({ ftr }) {
  return (
    <footer className={styles.ftr}>
      <Lnk path={"/uploads/policy.pdf"} style={{ maxWidth: "480px", textAlign: "center" }}>
        {ftr.caption}
      </Lnk>
    </footer>
  );
}
