const express = require("express");
const path = require("node:path");
const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);

const { loadEnvFile } = require("node:process");

try {
  loadEnvFile();
} catch (error) {
  if (error.code !== "ENOENT") throw error;
}

const app = express();

const signUpRoutes = require("./routes/signUpRoutes.js");
const logInRoutes = require("./routes/logInRoutes.js");
const dashboardRoutes = require("./routes/dashboardRoutes.js");

const pool = require("./db/pool.js");
const passport = require("passport");

app.set("views", path.join(__dirname, "views"));
app.set("views engine", "ejs");

app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    store: new pgSession({
      pool,
      tableName: "session",
    }),
    cookie: { maxAge: 1000 * 64 * 64 * 24 },
  }),
);

require("./config/passport.js");

app.use(passport.session());

app.get("/", (req, res) => res.render("index.ejs"));

app.use("/sign-up", signUpRoutes);
app.use("/log-in", logInRoutes);
app.use("/dashboard", dashboardRoutes);

const port = process.env.NODE_SERVER_PORT;

app.listen(port, (error) => {
  if (error) throw error;
  console.log(`listening on ${port}`);
});
