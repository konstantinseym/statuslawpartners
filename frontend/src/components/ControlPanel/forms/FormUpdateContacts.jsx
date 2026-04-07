import styles from "./Forms.module.css";
import { useState } from "react";
import { updateContacts } from "../api/updatecontacts.js";

export default function FormUpdateContacts({ contacts }) {
  const [formData, setFormData] = useState(contacts),
    [isLoading, setisLoading] = useState(false);

  function addField() {
    setFormData((prev) => ({
      ...prev,
      minorCaptions: [...prev.minorCaptions, { id: Date.now(), value: "" }],
    }));
  }

  function deleteField(id) {
    setFormData((prev) => ({
      ...prev,
      minorCaptions: prev.minorCaptions.filter((item) => item.id !== id),
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setisLoading(true);
    const response = await updateContacts(formData);
    if ((response.status = 200)) {
      setisLoading(false);
    } else {
      alert("Что-то пошло не так...");
    }
  }
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2>Редактировать контакты</h2>
      <h3>Основное поле</h3>
      <input
        type="text"
        className={styles.text}
        value={formData.majorCaption}
        onChange={(e) =>
          setFormData({ ...formData, majorCaption: e.target.value })
        }
      />
      <h3>Дополнительные поля</h3>
      {formData.minorCaptions.map((caption) => (
        <div key={caption.id} style={{ width: "100%" }}>
          <input
            type="text"
            className={styles.text}
            value={caption.value}
            onChange={(e) =>
              setFormData((prev) => ({
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
            value="DEL"
            className={styles.button}
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
        value="Сохранить"
        disabled={isLoading}
      />
    </form>
  );
}
