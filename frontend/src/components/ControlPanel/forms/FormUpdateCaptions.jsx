import { useState } from "react";
import { updateCaptions } from "../api/updatecaptions.js";
import styles from "./Forms.module.css";

export default function FormUpdateCaptions({ captions }) {
  const [formData, setFormData] = useState(captions),
    [isLoading, setisLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setisLoading(true);
    const response = await updateCaptions(formData);
    if ((response.status === 200)) {
      setisLoading(false);
    } else {
      alert("Что-то пошло не так...");
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2>Редактировать заголовки</h2>
      <input
        type="text"
        className={styles.text}
        placeholder="Заголовок"
        value={formData.heroMajor}
        onChange={(e) =>
          setFormData({ ...formData, heroMajor: e.target.value })
        }
      />
      <input
        type="text"
        className={styles.text}
        placeholder="Подзаголовок"
        value={formData.heroMinor}
        onChange={(e) =>
          setFormData({ ...formData, heroMinor: e.target.value })
        }
      />
      <input
        type="text"
        className={styles.text}
        placeholder="Заголовок объявлений"
        value={formData.newsCaption}
        onChange={(e) =>
          setFormData({ ...formData, newsCaption: e.target.value })
        }
      />
      <input
        type="text"
        className={styles.text}
        placeholder="Заголовок реквизитов"
        value={formData.detailsCaption}
        onChange={(e) =>
          setFormData({ ...formData, detailsCaption: e.target.value })
        }
      />
      <input
        type="text"
        className={styles.text}
        placeholder="Заголовок контактов"
        value={formData.contactsCaption}
        onChange={(e) =>
          setFormData({ ...formData, contactsCaption: e.target.value })
        }
      />
      <input
        type="text"
        className={styles.text}
        placeholder="Заголовок сотрудников"
        value={formData.employeesCaption}
        onChange={(e) => {
          setFormData({ ...formData, employeesCaption: e.target.value });
        }}
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
