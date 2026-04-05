import express from "express";
import { pool } from "./db/pool.js";
import { initTables } from "./db/initTables.js";

const app = express();

app.use(express.json());

await initTables();

app.get("/api/getAppData", async (req, res) => {
  const dbStringsvalues = await pool.query(
    "SELECT data FROM content WHERE section = $1",
    ["stringsvalues"],
  );

  const appData = {
    captions: dbStringsvalues.rows[0].data.captions,
    blocksContent: dbStringsvalues.rows[0].data.blocksContent,
    news: (await pool.query("SELECT * FROM news")).rows,
    employees: (await pool.query("SELECT * FROM employees")).rows,
    footerLink: dbStringsvalues.rows[0].data.footerLink,
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
  const dbData = (await pool.query("SELECT * FROM content;")).rows[0];
  dbData.data.captions = req.body;
  await pool.query(
    "UPDATE content SET data = $1 WHERE section = 'stringsvalues';",
    [dbData.data],
  );
  res.sendStatus(200);
});

app.listen(3000, () => console.log("server started at port 3000"));
