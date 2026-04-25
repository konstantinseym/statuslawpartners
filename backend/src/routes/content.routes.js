import { Router } from "express";
import { checkAuth } from "../middlewares/checkAuth.js";
import { uploadHeroBG, uploadPolicy } from "../config/multer.js";
import {
  updateCaptions,
  updateDetails,
  updateContacts,
  updateFooterLink,
  updateHeroBackground,
  updatePolicy,
} from "../controllers/content.controller.js";

export const contentRouter = Router();

contentRouter.put("/captions", checkAuth, updateCaptions);
contentRouter.put("/details", checkAuth, updateDetails);
contentRouter.put("/contacts", checkAuth, updateContacts);
contentRouter.put("/footer-link", checkAuth, updateFooterLink);
contentRouter.put(
  "/hero-background",
  checkAuth,
  uploadHeroBG.single("file"),
  updateHeroBackground,
);
contentRouter.put(
  "/policy",
  checkAuth,
  uploadPolicy.single("file"),
  updatePolicy,
);
