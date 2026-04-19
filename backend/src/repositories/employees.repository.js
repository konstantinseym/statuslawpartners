import { pool } from "../db/pool.js";

export async function getAllEmployees() {
  const result = await pool.query(
    "SELECT * FROM employees ORDER BY position ASC;",
  );
  return result.rows;
}

export async function getEmployee(id) {
  const result = await pool.query("SELECT * FROM employees WHERE id = $1;", [
    id,
  ]);
  return result.rows[0];
}

export async function newEmployee({ name, role, imageurl, imagealt }) {
  const result = await pool.query(
    "SELECT COALESCE(MAX(position), 0) AS max_position FROM employees;",
  );
  const position = result.rows[0].max_position + 1;

  await pool.query(
    "INSERT INTO employees (name, post, imageurl, imagealt, position) VALUES ($1, $2, $3, $4, $5);",
    [name, role, imageurl, imagealt, position],
  );
}

export async function deleteEmployee(id) {
  await pool.query("DELETE FROM employees WHERE id = $1;", [id]);
}

export async function updateEmployeesOrder(data) {
  for (const employee of data) {
    await pool.query("UPDATE employees SET position = $1 WHERE id = $2;", [
      employee.position,
      employee.id,
    ]);
  }
}
