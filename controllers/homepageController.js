const db = require("../db/queries.js");

const homepageGet = async (req, res) => {
  res.locals.isMember = req.user?.membership_status;
  res.locals.isAdmin = req.user?.is_admin;
  const messages = await db.getAllMessages();
  res.render("index.ejs", { messages });
};

const deleteMessageGet = async (req, res) => {
  if (req.user?.is_admin) {
    await db.deleteMessage(req.query.id);
    res.redirect("/");
  } else
    res.status(401).json({ msg: "You're not authorized to delete messages" });
};

module.exports = {
  homepageGet,
  deleteMessageGet,
};
