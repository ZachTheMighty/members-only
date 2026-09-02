const db = require("../db/queries.js");

const homepageGet = async (req, res) => {
  res.locals.isMember = req.user?.membership_status;
  const messages = await db.getAllMessages();
  res.render("index.ejs", { messages });
};

module.exports = {
  homepageGet,
};
