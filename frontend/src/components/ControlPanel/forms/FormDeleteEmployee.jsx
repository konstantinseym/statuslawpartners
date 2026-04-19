import axios from "axios";
import { useState } from "react";

import styles from "../ControlPanel.module.css";

export default function FormDeleteEmployee({
  employees,
  handleDeleteEmployee,
}) {
  const [deletingId, setDeletingId] = useState(null);

  async function handleDelete(id) {
    if (deletingId !== null) {
      return;
    }

    try {
      setDeletingId(id);

      await axios.delete("/api/employees/" + id, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });

      handleDeleteEmployee?.();
    } catch (err) {
      console.log(err);
      alert("Ошибка");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <form className={styles.form}>
      <h2 className={styles.caption}>Удалить сотрудника</h2>
      {employees.map((employeesItem) => {
        const isCurrentItemDeleting = deletingId === employeesItem.id;
        const isAnyItemDeleting = deletingId !== null;

        return (
          <div
            key={employeesItem.id}
            className={styles.flexcontainer}
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <input
              className={[styles.button, styles.buttonred].join(" ")}
              type="button"
              value={isCurrentItemDeleting ? "..." : "-"}
              onClick={() => handleDelete(employeesItem.id)}
              disabled={isAnyItemDeleting}
            />
            <p className={styles.pgph}>{employeesItem.name}</p>
          </div>
        );
      })}
    </form>
  );
}
