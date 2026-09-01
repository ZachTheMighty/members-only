const express = require("express");
const path = require("node:path");

const { loadEnvFile } = require("node:process");

try {
  loadEnvFile();
} catch (error) {
  if (error.code !== "ENOENT") throw error;
}

const app = express();

const signUpRoutes = require("./routes/signUpRoutes.js");
const logInRoutes = require("./routes/logInRoutes.js");

app.set("views", path.join(__dirname, "views"));
app.set("views engine", "ejs");

app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => res.render("index.ejs"));

app.use(signUpRoutes);
app.use(logInRoutes);

const port = process.env.NODE_SERVER_PORT;

app.listen(port, (error) => {
  if (error) throw error;
  console.log(`listening on ${port}`);
});
