import axios from "axios";

export async function deleteEmployee(id) {
  const response = await axios.delete("/api/employees/" + id);
  return response;
}
