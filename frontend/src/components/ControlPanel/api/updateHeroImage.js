import axios from "axios";

export async function updateHeroImage(imageData) {
  const response = await axios.put("/api/hero-background", imageData);
  return response;
}
