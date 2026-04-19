import styles from "../ControlPanel.module.css";
import { useState } from "react";
import axios from "axios";

export default function FormAddEmployee({ handleAddEmployee }) {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    name: "",
    role: "",
    alt: "",
  });

  function handleFileChange(e) {
    const allowedTypes = ["image/jpeg", "image/png"];
    const allowedSize = 10 * 1024 * 1024;

    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    if (!allowedTypes.includes(selectedFile.type)) {
      setFile(null);
      return alert("not allowed file type");
    }

    if (selectedFile.size > allowedSize) {
      setFile(null);
      return alert("not allowed file size");
    }

    setFile(e.target.files[0]);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", file);
    formData.append("data", JSON.stringify(formValues));

    try {
      setIsLoading(true);
      await axios.post("/api/employees", formData);
      setFile(null);
      handleAddEmployee();
      setFormValues({
        name: "",
        role: "",
        alt: "",
      });
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.caption}>Добавить сотрудника</h2>
      <p className={styles.pgph}>{formValues.name.length} / 128</p>
      <input
        type="text"
        className={styles.text}
        placeholder="Ф.И.О"
        maxLength={128}
        value={formValues.name}
        onChange={(e) => setFormValues({ ...formValues, name: e.target.value })}
      />
      <p className={styles.pgph}>{formValues.role.length} / 128</p>
      <input
        type="text"
        className={styles.text}
        placeholder="Должность"
        maxLength={128}
        value={formValues.role}
        onChange={(e) => setFormValues({ ...formValues, role: e.target.value })}
      />
      <p className={styles.pgph}>{formValues.alt.length} / 128</p>
      <input
        type="text"
        className={styles.text}
        placeholder="Подпись под фото"
        maxLength={128}
        value={formValues.alt}
        onChange={(e) => setFormValues({ ...formValues, alt: e.target.value })}
      />
      <label className={styles.fileupload}>
        <input
          type="file"
          className={styles.file}
          accept="image/png, image/jpeg"
          onChange={handleFileChange}
        />
        <p className={styles.pgph}>{file ? file.name : "Загрузить фото"}</p>
      </label>
      <p className={styles.pgph}>Максимальный размер файла: 10МБ (JPG / PNG)</p>
      <input
        type="submit"
        className={styles.button}
        value="Добавить"
        disabled={isLoading}
      />
    </form>
  );
}
