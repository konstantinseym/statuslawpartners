import axios from "axios";

export async function updateContacts(contacts) {
  const response = await axios.put("/api/contacts", contacts);
  return response;
}
