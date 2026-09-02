const db = require("../db/queries.js");

const homepageGet = async (req, res) => {
  const messages = await db.getAllMessages();
  res.render("index.ejs", { messages });
};

module.exports = {
  homepageGet,
};
