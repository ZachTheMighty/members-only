const db = require("../db/queries.js");

const signUpFormGet = (req, res) => res.render("sign_up.ejs");

const signUpFormPost = [
  async (req, res) => {
    const user = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
    };
    await db.insertUser(user);
    res.render("sign_up.ejs");
  },
];

module.exports = {
  signUpFormGet,
  signUpFormPost,
};
