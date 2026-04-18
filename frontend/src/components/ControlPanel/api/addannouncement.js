import axios from "axios";

export async function addAnnouncement(announcementData) {
  try {
    const response = await axios.post("/api/announcements", announcementData);
    return response;
  } catch (err) {
    console.log(err);
  }
}
