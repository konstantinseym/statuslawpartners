import express from "express";
import { pool } from "./db/pool.js";
import multer from "multer";
import path from "path";
import bcrypt from "bcrypt";
import session from "express-session";

const app = express();

app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use(
  session({
    name: "sessionId",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 1000 * 60 * 60,
    },
  }),
);

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}${ext}`);
  },
});

const upload = multer({ storage });

const hash = process.env.ADMIN_PASSWORD_HASH;

function checkAuth(req, res, next) {
  if (req.session.isAuth) {
    return next();
  }
  return res.sendStatus(401);
}

app.get("/api/session", (req, res) => {
  if (req.session.isAuth) {
    return res.json({ isAuth: true });
  }
  res.json({ isAuth: false });
});

app.post("/api/session", async (req, res) => {
  const clientPassword = req.body.password;
  const checkPassword = await bcrypt.compare(clientPassword, hash);
  if (checkPassword === false) {
    return res.sendStatus(401);
  }
  req.session.isAuth = true;
  res.sendStatus(200);
});

// CRUD logic

app.get("/api/app-data", async (_, res) => {
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

app.post("/api/announcements", checkAuth, async (req, res) => {
  const clientData = req.body;
  await pool.query("INSERT INTO news (title, content) values ($1, $2);", [
    clientData.caption,
    clientData.content,
  ]);
  res.sendStatus(201);
});

app.delete("/api/announcements/:id", checkAuth, async (req, res) => {
  const id = req.params.id;
  await pool.query("DELETE FROM news WHERE id = $1;", [id]);
  res.sendStatus(204);
});

app.put("/api/captions", checkAuth, async (req, res) => {
  await pool.query(
    "UPDATE stringvalues SET data = $1::jsonb WHERE section = 'captions';",
    [JSON.stringify(req.body)],
  );
  res.sendStatus(200);
});

app.put("/api/details", checkAuth, async (req, res) => {
  await pool.query(
    "UPDATE stringvalues SET data = $1::jsonb WHERE section = 'detailsBlock';",
    [JSON.stringify(req.body)],
  );
  res.sendStatus(200);
});

app.put("/api/contacts", checkAuth, async (req, res) => {
  await pool.query(
    "UPDATE stringvalues SET data = $1::jsonb WHERE section = 'contactsBlock';",
    [JSON.stringify(req.body)],
  );
  res.sendStatus(200);
});

app.put("/api/footer-link", checkAuth, async (req, res) => {
  await pool.query(
    "UPDATE stringvalues SET data = $1::jsonb WHERE section = 'footerLink';",
    [JSON.stringify(req.body)],
  );
  res.sendStatus(200);
});

app.post(
  "/api/employees",
  checkAuth,
  upload.single("file"),
  async (req, res) => {
    const newEmployeeData = JSON.parse(req.body.data);
    const filePath = "/uploads/" + req.file.filename;

    await pool.query(
      "INSERT INTO employees (name, post, imageurl, imagealt) VALUES ($1, $2, $3, $4);",
      [
        newEmployeeData.name,
        newEmployeeData.role,
        filePath,
        newEmployeeData.alt,
      ],
    );

    res.sendStatus(201);
  },
);

app.listen(3000, () => console.log("server started at port 3000"));
