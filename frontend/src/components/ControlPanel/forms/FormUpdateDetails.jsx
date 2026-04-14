import { useState } from "react";

import { updateDetails } from "../api/updateDetails";

import styles from "../ControlPanel.module.css";

export default function FormUpdateDetails({ details }) {
  const [formData, setFormData] = useState(details),
    [isLoading, setisLoading] = useState(false);

  function addField() {
    setFormData((prev) => [...prev, { id: Date.now(), value: "" }]);
  }

  function deleteField(id) {
    setFormData((prev) => prev.filter((item) => item.id !== id));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setisLoading(true);
    const response = await updateDetails(formData);
    if (response.status === 200) {
      setisLoading(false);
    } else {
      alert("Что-то пошло не так...");
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.caption}>Редактировать реквизиты</h2>
      {formData.map((string) => (
        <div key={string.id}>
          <p className={styles.pgph}>{string.value.length} / 96</p>
          <input
            maxLength={96}
            value={string.value}
            onChange={(e) =>
              setFormData((prev) =>
                prev.map((item) =>
                  item.id === string.id
                    ? { ...item, value: e.target.value }
                    : item,
                ),
              )
            }
            type="text"
            className={styles.text}
          />
          <input
            type="button"
            value="-"
            className={[styles.button, styles.buttonred].join(" ")}
            onClick={() => deleteField(string.id)}
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
        value={"Сохранить"}
        disabled={isLoading}
      />
    </form>
  );
}
