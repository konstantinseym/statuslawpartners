import axios from "axios";
import { useState } from "react";

import styles from "../Forms.module.css";

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
      <h2 className={styles.title}>Delete employee</h2>
      {employees.map((employeesItem) => {
        const isCurrentItemDeleting = deletingId === employeesItem.id;
        const isAnyItemDeleting = deletingId !== null;

        return (
          <div key={employeesItem.id} className={styles.editemployeecontainer}>
            <p className={styles.text}>{employeesItem.name}</p>
            <input
              className={[styles.button, styles.buttonred].join(" ")}
              type="button"
              value={isCurrentItemDeleting ? "..." : "delete"}
              onClick={() => handleDelete(employeesItem.id)}
              disabled={isAnyItemDeleting}
            />
          </div>
        );
      })}
    </form>
  );
}
