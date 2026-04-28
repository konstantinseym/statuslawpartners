import { updateStringValue } from "../repositories/stringValues.repository.js";

const JSON_LIMIT = 20000;

function validateJSONLength(data) {
  if (!data || typeof data !== "object") {
    throw new Error("invalid data");
  }

  const stringifiedData = JSON.stringify(data);

  if (stringifiedData.length > JSON_LIMIT) {
    throw new Error("one or more values is too long");
  }
}

export async function updateCaptionsService(data) {
  validateJSONLength(data);
  await updateStringValue("captions", data);
}

export async function updateDetailsService(data) {
  validateJSONLength(data);
  await updateStringValue("detailsBlock", data);
}

export async function updateContactsService(data) {
  validateJSONLength(data);
  await updateStringValue("contactsBlock", data);
}

export async function updateFooterLinkService(data) {
  validateJSONLength(data);
  await updateStringValue("footerLink", data);
}
