const db = require("../db/queries.js");

const dashboardGet = (req, res) => {
  if (req.isAuthenticated())
    res.render("dashboard.ejs", {
      fullName: `${req.user.first_name} ${req.user.last_name}`,
    });
  else
    res.status(401).json({ msg: "You're not authorized to visit this page" });
};

const createMessageGet = (req, res) => res.render("createMessageForm.ejs");

const createMessagePost = async (req, res) => {
  const message = {
    message: req.body.message,
    date: new Date(),
    author: req.user.id,
  };
  await db.insertMessage(message);
  res.redirect("/dashboard");
};

module.exports = {
  dashboardGet,
  createMessageGet,
  createMessagePost,
};
