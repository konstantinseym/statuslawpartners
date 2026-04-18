import axios from "axios";

export async function updateFooterLink(link) {
  try {
    const response = await axios.put("/api/footer-link", link);
    return response;
  } catch (err) {
    console.log(err);
  }
}
