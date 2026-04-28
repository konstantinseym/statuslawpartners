import axios from "axios";

export async function updateFooterLink(link) {
  const response = await axios.put("/api/footer-link", link);
  return response;
}
