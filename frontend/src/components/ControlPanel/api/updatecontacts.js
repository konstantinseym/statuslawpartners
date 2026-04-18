import axios from "axios";

export async function updateContacts(contacts) {
  try {
    const response = await axios.put("/api/contacts", contacts);
    return response;
  } catch (err) {
    console.log(err);
  }
}
