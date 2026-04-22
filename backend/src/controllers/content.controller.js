import {
  updateCaptionsService,
  updateDetailsService,
  updateContactsService,
  updateFooterLinkService,
} from "../services/content.service.js";

export async function updateCaptions(req, res, next) {
  try {
    await updateCaptionsService(req.body);
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
}

export async function updateDetails(req, res, next) {
  try {
    await updateDetailsService(req.body);
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
}

export async function updateContacts(req, res, next) {
  try {
    await updateContactsService(req.body);
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
}

export async function updateFooterLink(req, res, next) {
  try {
    await updateFooterLinkService(req.body);
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
}

export async function updateHeroBackground(req, res, next) {
  res.sendStatus(200);
}

export async function updatePolicy(req, res, next) {
  res.sendStatus(200);
}
