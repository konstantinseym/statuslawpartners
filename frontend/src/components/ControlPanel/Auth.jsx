import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import styles from "./Auth.module.css";

export default function Auth() {
  const [passwordInputValue, setPasswordInputValue] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();

    await axios.post(
      "/api/session",
      { password: passwordInputValue },
      { withCredentials: true },
    );
    navigate("/controlpanel");
  }

  return (
    <main className={styles.authmain}>
      <form className={styles.form} onSubmit={handleLogin}>
        <h2 className={styles.title}>password</h2>
        <input
          type="password"
          className={styles.inputfield}
          value={passwordInputValue}
          onChange={(e) => setPasswordInputValue(e.target.value)}
        />
        <input type="submit" className={styles.button} value={"login"} />
      </form>
    </main>
  );
}
