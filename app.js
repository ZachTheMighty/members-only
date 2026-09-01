const express = require("express");
const path = require("node:path");

const { loadEnvFile } = require("node:process");
loadEnvFile();

const app = express();

const routes = require("./routes/routes.js");

app.set("views", path.join(__dirname, "views"));
app.set("views engine", "ejs");

app.use(routes);

const port = process.env.NODE_SERVER_PORT;

app.listen(port, () => {
  console.log(`listening on ${port}`);
});
