import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./ControlPanel.module.css";

// делаем тут навбар, роутер внутри под навбаром. переключаемся в навбаре меджу формами редактирования разных разделов и блоков. формы при этом генерим из конфигов-объектов, может быть тут понадобятся как-то классы наконец?
// тогда компонент и структура админки будут гуд. нужно будет не скупиться просто и не спешить, сделать столько форм, сколько нужно. может быть сами формы по логике и структуре сделать как-то поумнее и не настолько на коленке.

export default function ControlPanel() {
  useEffect(() => {
    async function fetchAppData() {
      try {
        const res = await axios.get("/api/getAppData");
      } catch (err) {
        console.log(err);
      }
    }

    fetchAppData();
  }, []);

  async function addAnnouncementSubmit(e) {
    e.preventDefault();
  }

  async function updateCaptions(e) {
    e.preventDefault();
  }

  async function updateEmployees(e) {
    e.preventDefault();
  }

  return (
    <main className={styles.controlpanel}>
      <h1>control panel</h1>
      <form className={styles.form} onSubmit={addAnnouncementSubmit}>
        <h2>Добавить объявление</h2>
        <input type="text" className={styles.text} placeholder="Заголовок" />
        <textarea className={styles.textarea} placeholder="Текст"></textarea>
        <input type="submit" className={styles.button} value={"Добавить"} />
      </form>
      <form className={styles.form} onSubmit={addAnnouncementSubmit}>
        <h2>Редактировать объявления</h2>
      </form>
      <form className={styles.form} onSubmit={updateCaptions}>
        <h2>Редактировать заголовки</h2>
        <input type="text" className={styles.text} placeholder="Логотип" />
        <input
          type="text"
          className={styles.text}
          placeholder="Подпись под логотипом"
        />
        <input
          type="text"
          className={styles.text}
          placeholder="Раздел новостей"
        />
        <input
          type="text"
          className={styles.text}
          placeholder="Раздел сотрудников"
        />
        <input
          type="text"
          className={styles.text}
          placeholder="Раздел реквизитов"
        />
        <input
          type="text"
          className={styles.text}
          placeholder="Раздел контактов"
        />
        <input
          type="text"
          className={styles.text}
          placeholder="Подзаголовок в разделе контактов"
        />
        <input
          type="text"
          className={styles.text}
          placeholder="Текст ссылки в подвале"
        />
        <input
          type="text"
          className={styles.text}
          placeholder="Ссылка в подвале"
        />
        <h2>Реквизиты - редактировать строки</h2>
        <input type="text" className={styles.text} />
        <h2>Контакты - редактировать строки</h2>
        <input type="text" className={styles.text} />
        <input type="submit" className={styles.button} value={"Сохранить"} />
      </form>
      <form className={styles.form} onSubmit={updateEmployees}>
        <h2>Редактировать раздел "Сотрудники"</h2>
        <input
          type="text"
          className={styles.text}
          placeholder="Строка 1 (Ф.И.О.)"
        />
        <input
          type="text"
          className={styles.text}
          placeholder="Строка 2 (должность)"
        />
        <input
          type="text"
          className={styles.text}
          placeholder="Подсказка под фото"
        />
        <input type="submit" className={styles.button} value={"Сохранить"} />
      </form>
    </main>
  );
}
