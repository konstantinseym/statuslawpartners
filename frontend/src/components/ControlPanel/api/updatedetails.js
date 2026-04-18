import axios from "axios";

export async function updateDetails(details) {
  try {
    const response = await axios.put("/api/details", details);
    return response;
  } catch (err) {
    console.log(err);
  }
}
