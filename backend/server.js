import express from "express";
import { pool } from "./db/pool.js";

const app = express();

app.use(express.json());

app.get("/api/getAppData", async (_, res) => {
  const stringValues = (await pool.query("SELECT * FROM stringvalues")).rows;
  const appData = {
    news: (await pool.query("SELECT * FROM news ORDER BY id DESC")).rows,
    employees: (await pool.query("SELECT * FROM employees")).rows,
    captions: stringValues.find((arr) => arr.section === "captions")?.data,
    detailsBlock: stringValues.find((arr) => arr.section === "detailsBlock")
      ?.data,
    contactsBlock: stringValues.find((arr) => arr.section === "contactsBlock")
      ?.data,
    footerLink: stringValues.find((arr) => arr.section === "footerLink")?.data,
  };

  res.json(appData);
});

app.post("/api/addAnnouncement", async (req, res) => {
  const clientData = req.body;
  await pool.query("INSERT INTO news (title, content) values ($1, $2);", [
    clientData.caption,
    clientData.content,
  ]);
  res.sendStatus(201);
});

app.delete("/api/deleteAnnouncement/:id", async (req, res) => {
  const id = req.params.id;
  await pool.query("DELETE FROM news WHERE id = $1;", [id]);
  res.sendStatus(200);
});

app.put("/api/updateCaptions", async (req, res) => {
  await pool.query(
    "UPDATE stringvalues SET data = $1::jsonb WHERE section = 'captions';",
    [JSON.stringify(req.body)],
  );
  res.sendStatus(200);
});

app.put("/api/updatedetails", async (req, res) => {
  await pool.query(
    "UPDATE stringvalues SET data = $1::jsonb WHERE section = 'detailsBlock';",
    [JSON.stringify(req.body)],
  );
  res.sendStatus(200);
});

app.put("/api/updateContacts", async (req, res) => {
  await pool.query(
    "UPDATE stringvalues SET data = $1::jsonb WHERE section = 'contactsBlock';",
    [JSON.stringify(req.body)],
  );
  res.sendStatus(200);
});

app.put("/api/updateFooterLink", async (req, res) => {
  await pool.query(
    "UPDATE stringvalues SET data = $1::jsonb WHERE section = 'footerLink';",
    [JSON.stringify(req.body)],
  );
  res.sendStatus(200);
});

app.listen(3000, () => console.log("server started at port 3000"));
