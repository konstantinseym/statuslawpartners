import styles from "./Employees.module.css";
import MinorCaption from "../UI/MinorCaption/MinorCaption.jsx";
import SubTextLine from "../UI/SubTextLine/SubTextLine.jsx";

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
          <SubTextLine>{employee.post}</SubTextLine>
        </figure>
      ))}
    </div>
  );
}
