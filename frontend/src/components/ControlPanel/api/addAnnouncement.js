import axios from "axios";

export async function addAnnouncement(announcementData) {
  const response = await axios.post("/api/announcements", announcementData);
  return response;
}
