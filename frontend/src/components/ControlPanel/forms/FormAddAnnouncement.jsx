import { useState } from "react";

import { addAnnouncement } from "../api/addannouncement.js";
import { ANNOUNCEMENT_VALIDATION_RULES } from "../validation/validationRules.js";
import { validateFormAddAnnouncement } from "../validation/validationForms.js";

import styles from "../Forms.module.css";

const INITIAL_FORM_STATE = {
  caption: "",
  content: "",
};

export default function FormAddAnnouncement({ handleAddAnnouncement }) {
  const [formValue, setFormValue] = useState(INITIAL_FORM_STATE);
  const [isLoading, setIsLoading] = useState(false);

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormValue((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const normalizedData = {
      caption: formValue.caption.trim(),
      content: formValue.content.trim(),
    };

    const validationError = validateFormAddAnnouncement(normalizedData);
    if (validationError) {
      alert(validationError);
      return;
    }

    try {
      setIsLoading(true);
      await addAnnouncement(normalizedData);
      setFormValue(INITIAL_FORM_STATE);
      handleAddAnnouncement();
    } catch (err) {
      console.log(err);
      alert("Error");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.title}>Add announcement</h2>
      <p className={styles.text}>
        {formValue.caption.length} / {ANNOUNCEMENT_VALIDATION_RULES.captionMax}
      </p>
      <input
        type="text"
        name="caption"
        className={styles.inputfield}
        placeholder="Title"
        maxLength={ANNOUNCEMENT_VALIDATION_RULES.captionMax}
        value={formValue.caption}
        onChange={handleInputChange}
        disabled={isLoading}
      />
      <textarea
        name="content"
        className={styles.inputtextarea}
        placeholder="Text"
        maxLength={ANNOUNCEMENT_VALIDATION_RULES.contentMax}
        value={formValue.content}
        onChange={handleInputChange}
        disabled={isLoading}
      />
      <input
        type="submit"
        className={styles.button}
        value={isLoading ? "Loading..." : "Post"}
        disabled={isLoading}
      />
    </form>
  );
}
