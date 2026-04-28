import axios from "axios";

export async function arrangeEmployees(employeesData) {
  const response = await axios.put("/api/employees", employeesData);
  return response;
}
