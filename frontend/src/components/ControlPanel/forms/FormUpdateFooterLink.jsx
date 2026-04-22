import { useState } from "react";

import { validateFormUpdateFooterLink } from "../validation/validationForms.js";
import { updateFooterLink } from "../api/updateFooterLink.js";
import { FOOTERLINK_VALIDATION_RULES } from "../validation/validationRules.js";

import styles from "../ControlPanel.module.css";

export default function FormUpdateFooterLink({ link }) {
  const [formValue, setFormValue] = useState(link);
  const [isLoading, setIsLoading] = useState(false);

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormValue((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const normalizedData = {
      caption: formValue.caption.trim(),
    };

    const validationError = validateFormUpdateFooterLink(normalizedData);
    if (validationError) {
      alert(validationError);
      return;
    }

    try {
      setIsLoading(true);
      await updateFooterLink(normalizedData);
    } catch (err) {
      console.log(err);
      alert("Ошибка");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.caption}>Редактировать ссылку в подвале</h2>
      <label className={styles.formlabel}>
        Текст ({formValue.caption.length} /
        {FOOTERLINK_VALIDATION_RULES.captionMax})
        <input
          type="text"
          name="caption"
          className={styles.text}
          placeholder="Текст"
          maxLength={FOOTERLINK_VALIDATION_RULES.captionMax}
          value={formValue.caption}
          onChange={handleInputChange}
          disabled={isLoading}
        />
      </label>
      <input
        type="submit"
        className={styles.button}
        value="Сохранить"
        disabled={isLoading}
      />
    </form>
  );
}
