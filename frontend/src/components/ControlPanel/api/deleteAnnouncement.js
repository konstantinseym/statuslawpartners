import axios from "axios";

export async function deleteAnnouncement(id) {
  try {
    const response = await axios.delete("/api/announcements/" + id);
    return response;
  } catch (err) {
    console.log(err);
  }
}
