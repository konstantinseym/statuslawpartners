import { useState } from "react";

import { DETAILS_VALIDATION_RULES } from "../validation/validationRules";
import { updateDetails } from "../api/updatedetails";
import { validateFormUpdateDetails } from "../validation/validationForms";

import styles from "../Forms.module.css";

export default function FormUpdateDetails({ details }) {
  const [formValue, setFormValue] = useState(details);
  const [isLoading, setIsLoading] = useState(false);

  function handleInputChange(id, value) {
    setFormValue((prev) =>
      prev.map((item) => (item.id === id ? { ...item, value } : item)),
    );
  }

  function addField() {
    setFormValue((prev) => [...prev, { id: Date.now(), value: "" }]);
  }

  function deleteField(id) {
    setFormValue((prev) => prev.filter((item) => item.id !== id));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const normalizedData = formValue.map((item) => ({
      ...item,
      value: item.value.trim(),
    }));

    const validationError = validateFormUpdateDetails(normalizedData);
    if (validationError) {
      alert(validationError);
      return;
    }

    try {
      setIsLoading(true);
      await updateDetails(formValue);
    } catch (err) {
      console.log(err);
      alert("Ошибка");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.title}>Edit details</h2>
      {formValue.map((string) => (
        <div key={string.id} className={styles.detailsitem}>
          <label className={styles.label}>
            {string.value.length} / {DETAILS_VALIDATION_RULES.stringMax}
            <input
              maxLength={DETAILS_VALIDATION_RULES.stringMax}
              value={string.value}
              onChange={(e) => handleInputChange(string.id, e.target.value)}
              type="text"
              className={styles.inputfield}
              disabled={isLoading}
            />
          </label>
          <input
            type="button"
            value="delete"
            className={[styles.button, styles.buttonred].join(" ")}
            onClick={() => deleteField(string.id)}
            disabled={isLoading}
          />
        </div>
      ))}
      <input
        type="button"
        className={styles.button}
        value={"add field"}
        onClick={addField}
        disabled={isLoading}
      />
      <input
        type="submit"
        className={styles.button}
        value={"Save"}
        disabled={isLoading}
      />
    </form>
  );
}
