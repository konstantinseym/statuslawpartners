import { useState } from "react";
import styles from "./Forms.module.css";
import axios from "axios";

export default function FormAddEmployee() {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formValues, setFormValues] = useState({ name: "", role: "", alt: "" });

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();

    formData.append("file", file);
    formData.append("data", JSON.stringify(formValues));

    const response = await axios.post("/api/upload", formData);

    if (response.status === 200) {
      setIsLoading(false);
      setFormValues({ name: "", role: "", alt: "" });
      setFile(null);
    } else {
      alert("Что-то пошло не так...");
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2>Добавить сотрудника</h2>
      <input
        type="text"
        className={styles.text}
        placeholder="Ф.И.О"
        value={formValues.name}
        onChange={(e) => setFormValues({ ...formValues, name: e.target.value })}
      />
      <input
        type="text"
        className={styles.text}
        placeholder="Должность"
        value={formValues.role}
        onChange={(e) => setFormValues({ ...formValues, role: e.target.value })}
      />
      <input
        type="text"
        className={styles.text}
        placeholder="Подпись под фото"
        value={formValues.alt}
        onChange={(e) => setFormValues({ ...formValues, alt: e.target.value })}
      />
      <input
        type="file"
        className={styles.file}
        onChange={(e) => setFile(e.target.files[0])}
      />
      <input
        type="submit"
        className={styles.button}
        value="Добавить"
        disabled={isLoading}
      />
    </form>
  );
}
