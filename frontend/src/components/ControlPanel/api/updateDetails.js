import axios from "axios";

export async function updateDetails(details) {
  const response = await axios.put("/api/details", details);
  return response;
}
