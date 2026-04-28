import { useState } from "react";

import { CONTACTS_VALIDATION_RULES } from "../validation/validationRules.js";
import { updateContacts } from "../api/updateContacts.js";
import { validateFormUpdateContacts } from "../validation/validationForms.js";

import styles from "../Forms.module.css";

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
      return;
    }

    try {
      setisLoading(true);
      await updateContacts(normalizedData);
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setisLoading(false);
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.title}>Edit contacts</h2>

      <h3 className={styles.subtitle}>Main</h3>
      <div className={styles.contactsitem}>
        <label className={styles.label}>
          {formValue.majorCaption.length} /{" "}
          {CONTACTS_VALIDATION_RULES.majorCaptionMax}
          <input
            type="text"
            className={styles.inputfield}
            maxLength={CONTACTS_VALIDATION_RULES.majorCaptionMax}
            value={formValue.majorCaption}
            onChange={(e) =>
              setFormValue({ ...formValue, majorCaption: e.target.value })
            }
          />
        </label>
      </div>
      <h3 className={styles.subtitle}>Extra</h3>

      {formValue.minorCaptions.map((caption) => (
        <div key={caption.id} className={styles.contactsitem}>
          <label className={styles.label}>
            {caption.value.length} /{" "}
            {CONTACTS_VALIDATION_RULES.minorCaptionsMax}
            <input
              type="text"
              className={styles.inputfield}
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
          </label>
          <input
            type="button"
            value="delete"
            disabled={isLoading}
            className={[styles.button, styles.buttonred].join(" ")}
            onClick={() => deleteField(caption.id)}
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
        value={isLoading ? "Loading..." : "Save"}
        disabled={isLoading}
      />
    </form>
  );
}
