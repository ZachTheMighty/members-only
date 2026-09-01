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
const pool = require("./db/pool.js");
const passport = require("passport");

app.set("views", path.join(__dirname, "views"));
app.set("views engine", "ejs");

app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: "idk",
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

app.use(signUpRoutes);
app.use(logInRoutes);

app.get("/dashboard", (req, res) => {
  if (req.isAuthenticated())
    res.send(`<h1>Welcome, ${req.user.first_name} ${req.user.last_name}</h1>`);
  else
    res
      .status(401)
      .json({ msg: "You are not authorized to view this resource" });
});

app.get("/logout", (req, res) => {
  req.logout((error) => {
    if (error) return error;
    res.redirect("/");
  });
});

const port = process.env.NODE_SERVER_PORT;

app.listen(port, (error) => {
  if (error) throw error;
  console.log(`listening on ${port}`);
});
