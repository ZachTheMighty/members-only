const express = require("express");

const { loadEnvFile } = require("node:process");
loadEnvFile();

const app = express();

app.get("/", (req, res) => res.send("niggar"));

const port = process.env.NODE_SERVER_PORT;

app.listen(port, () => {
  console.log(`listening on ${port}`);
});
