import { useState } from "react";
import axios from "axios";

import styles from "../Forms.module.css";

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
      <h2 className={styles.title}>Add employee</h2>
      <label className={styles.label}>
        {formValues.name.length} / 128
        <input
          type="text"
          className={styles.inputfield}
          placeholder="Name"
          maxLength={128}
          value={formValues.name}
          onChange={(e) =>
            setFormValues({ ...formValues, name: e.target.value })
          }
        />
      </label>
      <label className={styles.label}>
        {formValues.role.length} / 128
        <input
          type="text"
          className={styles.inputfield}
          placeholder="Post"
          maxLength={128}
          value={formValues.role}
          onChange={(e) =>
            setFormValues({ ...formValues, role: e.target.value })
          }
        />
      </label>
      <label className={styles.label}>
        {formValues.alt.length} / 128
        <input
          type="text"
          className={styles.inputfield}
          placeholder="Image alt"
          maxLength={128}
          value={formValues.alt}
          onChange={(e) =>
            setFormValues({ ...formValues, alt: e.target.value })
          }
        />
      </label>
      <label className={styles.file}>
        <input
          type="file"
          accept="image/png, image/jpeg"
          onChange={handleFileChange}
        />
        <p className={styles.text}>{file ? file.name : "upload photo"}</p>
      </label>
      <p className={styles.text}>Max file size 10MB (JPG / PNG)</p>
      <input
        type="submit"
        className={styles.button}
        value={isLoading ? "Loading..." : "Add"}
        disabled={isLoading}
      />
    </form>
  );
}
