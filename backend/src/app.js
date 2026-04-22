import express from "express";
import session from "express-session";

import { sessionConfig } from "./config/session.js";
import { contentRouter } from "./routes/content.routes.js";
import { sessionRouter } from "./routes/session.routes.js";
import { appDataRouter } from "./routes/appData.routes.js";
import { announcementsRouter } from "./routes/announcements.routes.js";
import { employeesRouter } from "./routes/employees.routes.js";

export const app = express();

app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use(session(sessionConfig));

app.use("/api", contentRouter);
app.use("/api/session", sessionRouter);
app.use("/api/app-data", appDataRouter);
app.use("/api/announcements", announcementsRouter);
app.use("/api/employees", employeesRouter);
