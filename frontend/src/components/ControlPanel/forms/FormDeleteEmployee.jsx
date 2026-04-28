import { useState } from "react";

import { deleteEmployee } from "../api/deleteEmployee.js";

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
      await deleteEmployee(id);
      handleDeleteEmployee?.();
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
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
