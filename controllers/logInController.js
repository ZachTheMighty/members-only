const { body, validationResult, matchedData } = require("express-validator");
const passport = require("passport");

const logInFormGet = (req, res) => {
  res.render("log_in.ejs", { error: req.session.messages });
  req.session.messages = [];
};

const emptyError = "field can't be empty.";

const validateUser = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage(`Email ${emptyError}`)
    .isEmail()
    .withMessage(`Email must be in the format a@b.domain`),
  body("password")
    .trim()
    .notEmpty()
    .withMessage(`Password ${emptyError}`)
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
    .withMessage(
      `Password must be between 8 and 24  characters, and must contain at least one number and one symbol`,
    )
    .isLength({ max: 24 })
    .withMessage("Password must be between 8 and 24 characters"),
];

const logInFormPost = [
  validateUser,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).render("log_in.ejs", { errors: errors.array() });
    next();
  },

  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/log-in",
    failureMessage: true,
  }),
];

module.exports = {
  logInFormGet,
  logInFormPost,
};
