import axios from "axios";

export async function deleteAnnouncement(id) {
  const response = await axios.delete("/api/announcements/" + id);
  return response;
}
