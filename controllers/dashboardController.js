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

const joinGet = (req, res) => res.render("join.ejs");
const joinPost = async (req, res) => {
  if (req.body.passcode === process.env.CLUB_PASSCODE) {
    db.updateMemberShipStatus(req.user.id, true);
    res.render("dashboard.ejs", {
      fullName: `${req.user.first_name} ${req.user.last_name}`,
      isMember: req.user.membership_status,
    });
  } else res.render("join.ejs", { errors: [{ msg: "passcode is incorrect" }] });
};

module.exports = {
  dashboardGet,
  createMessageGet,
  createMessagePost,
  joinGet,
  joinPost,
};
