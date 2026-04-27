import { useState } from "react";
import axios from "axios";

import styles from "../Forms.module.css";

export default function FormUpdatePolicy() {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  function handleFileChange(e) {
    const allowedTypes = ["application/pdf"];
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

    try {
      setIsLoading(true);
      await axios.put("/api/policy", formData);
      setFile(null);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.title}>Upload Privacy Policy file</h2>
      <label className={styles.file}>
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
        />
        <p className={styles.text}>{file ? file.name : "upload file"}</p>
      </label>
      <p className={styles.text}>Max file size 10MB (PDF)</p>
      <input
        type="submit"
        className={styles.button}
        value={isLoading ? "Loading..." : "Upload"}
        disabled={isLoading}
      />
    </form>
  );
}
