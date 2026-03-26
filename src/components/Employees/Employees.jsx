import styles from "./Employees.module.css";
import MinorCaption from "../UI/MinorCaption/MinorCaption.jsx";

export default function Employees({ employees }) {
  return (
    <div className={styles.employees}>
      {employees.map((employee) => (
        <figure key={employee.id} className={styles.employees__employeecard}>
          <img
            className={styles.employees__employeeimg}
            src={employee.imageUrl}
            alt={employee.imageAlt}
          />
          <MinorCaption style={{ maxWidth: "90%", marginTop: "20px" }}>
            {employee.name}
          </MinorCaption>
          <span className={styles.employees__minorcaption}>
            {employee.post}
          </span>
        </figure>
      ))}
    </div>
  );
}
