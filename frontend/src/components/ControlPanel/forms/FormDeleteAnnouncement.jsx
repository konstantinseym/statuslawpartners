import { useState } from "react";

import { deleteAnnouncement } from "../api/deleteannouncement.js";
import { formatDate } from "../../../utils/formatDate.js";

import styles from "../Forms.module.css";

export default function FormDeleteAnnouncement({
  news,
  handleDeleteAnnouncement,
}) {
  const [deletingId, setDeletingId] = useState(null);

  async function handleDelete(id) {
    if (deletingId !== null) {
      return;
    }

    try {
      setDeletingId(id);
      await deleteAnnouncement(id);
      handleDeleteAnnouncement?.();
    } catch (err) {
      console.log(err);
      alert("Ошибка");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <form className={styles.form}>
      <h2 className={styles.title}>Delete announcement</h2>

      {news.length === 0 ? (
        <p className={styles.text}>No announcements yet</p>
      ) : (
        news.map((newsItem) => {
          const isCurrentItemDeleting = deletingId === newsItem.id;
          const isAnyItemDeleting = deletingId !== null;

          return (
            <div key={newsItem.id} className={styles.newsitem}>
              <div>
                <p className={styles.text}>{newsItem.title}</p>
                <p className={styles.text}>{formatDate(newsItem.date)}</p>
              </div>
              <input
                className={[styles.button, styles.buttonred].join(" ")}
                type="button"
                value={isCurrentItemDeleting ? "..." : "delete"}
                onClick={() => handleDelete(newsItem.id)}
                disabled={isAnyItemDeleting}
              />
            </div>
          );
        })
      )}
    </form>
  );
}
