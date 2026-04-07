import styles from "./Forms.module.css";
import { useState } from "react";
import { updateFooterLink } from "../api/updatefooterlink.js";

export default function FormUpdateFooterLink({ link }) {
  const [formData, setFormData] = useState(link),
    [isLoading, setisLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setisLoading(true);
    const response = await updateFooterLink(formData);
    if ((response.status === 200)) {
      setisLoading(false);
    } else {
      alert("Что-то пошло не так...");
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2>Редактировать ссылку в подвале</h2>
      <input
        type="text"
        className={styles.text}
        placeholder="URL"
        value={formData.link}
        onChange={(e) => setFormData({ ...formData, link: e.target.value })}
      />
      <input
        type="text"
        className={styles.text}
        placeholder="Текст"
        value={formData.caption}
        onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
      />
      <input
        type="submit"
        className={styles.button}
        value="Сохранить"
        disabled={isLoading}
      />
    </form>
  );
}
