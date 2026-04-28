import { useEffect, useState } from "react";

import { arrangeEmployees } from "../api/arrangeEmployees.js";

import styles from "../Forms.module.css";

export default function FormArrangeEmployees({
  employees,
  handleArrangeEmployees,
}) {
  const [employeesOrder, setEmployeesOrder] = useState(employees);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setEmployeesOrder(employees);
  }, [employees]);

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

    try {
      setIsLoading(true);
      await arrangeEmployees(normalizedOrder);
      handleArrangeEmployees();
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.title}>Arrange employees</h2>

      {employeesOrder.map((employeeItem, index) => {
        return (
          <div key={employeeItem.id} className={styles.editemployeecontainer}>
            <p className={styles.text}>
              {index + 1}. {employeeItem.name}
            </p>
            <div className={styles.editbtncontainer}>
              <input
                type="button"
                className={styles.button}
                value={"move up"}
                onClick={() => moveUp(index)}
              />
              <input
                type="button"
                className={styles.button}
                value={"move down"}
                onClick={() => moveDown(index)}
              />
            </div>
          </div>
        );
      })}
      <input
        type="submit"
        className={styles.button}
        value={isLoading ? "Loading..." : "Save"}
        disabled={isLoading}
      />
    </form>
  );
}
