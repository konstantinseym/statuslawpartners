import axios from "axios";

export async function addEmployee(employeeData) {
  const response = await axios.post("/api/employees", employeeData);
  return response;
}
