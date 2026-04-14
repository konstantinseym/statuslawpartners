import { useState } from "react";

import { CONTACTS_VALIDATION_RULES } from "../validation/validationrules.js";
import { updateContacts } from "../api/updateContacts.js";
import { validateFormUpdateContacts } from "../validation/validationForms.js";

import styles from "../ControlPanel.module.css";

export default function FormUpdateContacts({ contacts }) {
  const [formValue, setFormValue] = useState(contacts);
  const [isLoading, setisLoading] = useState(false);

  function addField() {
    setFormValue((prev) => ({
      ...prev,
      minorCaptions: [...prev.minorCaptions, { id: Date.now(), value: "" }],
    }));
  }

  function deleteField(id) {
    setFormValue((prev) => ({
      ...prev,
      minorCaptions: prev.minorCaptions.filter((item) => item.id !== id),
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const normalizedData = {
      majorCaption: formValue.majorCaption.trim(),
      minorCaptions: formValue.minorCaptions.map((item) => ({
        ...item,
        value: item.value.trim(),
      })),
    };

    const validationError = validateFormUpdateContacts(normalizedData);
    if (validationError) {
      alert(validationError);
    }

    try {
      setisLoading(true);
      await updateContacts(normalizedData);
    } catch (err) {
      console.log(err);
    } finally {
      setisLoading(false);
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.caption}>Редактировать контакты</h2>
      <h3>Основное поле</h3>
      <p className={styles.pgph}>
        {formValue.majorCaption.length} /{" "}
        {CONTACTS_VALIDATION_RULES.majorCaptionMax}
      </p>
      <input
        type="text"
        className={styles.text}
        maxLength={CONTACTS_VALIDATION_RULES.majorCaptionMax}
        value={formValue.majorCaption}
        onChange={(e) =>
          setFormValue({ ...formValue, majorCaption: e.target.value })
        }
      />
      <h3>Дополнительные поля</h3>
      {formValue.minorCaptions.map((caption) => (
        <div key={caption.id}>
          <p className={styles.pgph}>
            {caption.value.length} /{" "}
            {CONTACTS_VALIDATION_RULES.minorCaptionsMax}
          </p>
          <input
            type="text"
            className={styles.text}
            maxLength={CONTACTS_VALIDATION_RULES.minorCaptionsMax}
            value={caption.value}
            disabled={isLoading}
            onChange={(e) =>
              setFormValue((prev) => ({
                ...prev,
                minorCaptions: prev.minorCaptions.map((item) =>
                  item.id === caption.id
                    ? { ...item, value: e.target.value }
                    : item,
                ),
              }))
            }
          />
          <input
            type="button"
            value="-"
            disabled={isLoading}
            className={[styles.button, styles.buttonred].join(" ")}
            onClick={() => deleteField(caption.id)}
          />
        </div>
      ))}
      <input
        type="button"
        className={styles.button}
        value={"Добавить поле"}
        onClick={addField}
        disabled={isLoading}
      />
      <input
        type="submit"
        className={styles.button}
        value={isLoading ? "Сохранение" : "Сохранить"}
        disabled={isLoading}
      />
    </form>
  );
}
