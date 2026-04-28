import axios from "axios";

export async function updatePolicy(policyData) {
  const response = await axios.put("/api/policy", policyData);
  return response;
}
