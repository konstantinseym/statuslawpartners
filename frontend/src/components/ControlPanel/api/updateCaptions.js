import axios from "axios";

export async function updateCaptions(captions) {
  const response = await axios.put("/api/captions", captions);
  return response;
}
