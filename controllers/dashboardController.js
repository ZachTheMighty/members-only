const db = require("../db/queries.js");

const dashboardGet = (req, res) => {
  res.render("dashboard.ejs", {
    fullName: `${req.user.first_name} ${req.user.last_name}`,
  });
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
