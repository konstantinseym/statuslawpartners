import axios from "axios";

export async function updateCaptions(captions) {
  try {
    const response = await axios.put("/api/captions", captions);
    return response;
  } catch (err) {
    console.log(err);
  }
}
