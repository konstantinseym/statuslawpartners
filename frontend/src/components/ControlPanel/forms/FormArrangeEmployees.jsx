import axios from "axios";
import { useState } from "react";

import styles from "../ControlPanel.module.css";

export default function FormArrangeEmployees({
  employees,
  handleArrangeEmployees,
}) {
  const [employeesOrder, setEmployeesOrder] = useState(employees);
  const [isLoading, setIsLoading] = useState(false);

  function moveUp(index) {
    if (index === 0) return;

    const updatedOrder = [...employeesOrder];

    [updatedOrder[index - 1], updatedOrder[index]] = [
      updatedOrder[index],
      updatedOrder[index - 1],
    ];

    setEmployeesOrder(updatedOrder);
  }

  function moveDown(index) {
    if (index === employeesOrder.length - 1) return;

    const updatedOrder = [...employeesOrder];

    [updatedOrder[index], updatedOrder[index + 1]] = [
      updatedOrder[index + 1],
      updatedOrder[index],
    ];

    setEmployeesOrder(updatedOrder);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const normalizedOrder = employeesOrder.map((employee, index) => ({
      id: employee.id,
      position: index + 1,
    }));

    await axios.put("/api/employees", normalizedOrder, {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    });
    handleArrangeEmployees();
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.caption}>Сортировать сотрудников</h2>

      {employeesOrder.map((employeeItem, index) => {
        return (
          <div key={employeeItem.id}>
            <p className={styles.pgph}>
              {index + 1}. {employeeItem.name}
            </p>
            <p
              className={styles.pgph}
              style={{ textDecoration: "underline", cursor: "pointer" }}
              onClick={() => moveUp(index)}
            >
              move up
            </p>
            <p
              className={styles.pgph}
              style={{ textDecoration: "underline", cursor: "pointer" }}
              onClick={() => moveDown(index)}
            >
              move down
            </p>
          </div>
        );
      })}
      <input
        type="submit"
        className={styles.button}
        value="Сохранить"
        disabled={isLoading}
      />
    </form>
  );
}
