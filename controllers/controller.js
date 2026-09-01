const { body, validationResult, matchedData } = require("express-validator");
const db = require("../db/queries.js");

const emptyError = "field can't be empty.";
const alphaError = "can only contain alphabet characters.";
const strongPasswordError =
  "must be between 8 and 24  characters, and must contain at least one number and one symbol";
const maxLengthError = "Password must be between 8 and 24 charactesr";

const validateUser = [
  body("firstName")
    .trim()
    .notEmpty()
    .withMessage(`First name ${emptyError}`)
    .isAlpha()
    .withMessage(`First name ${alphaError}`),
  body("lastName")
    .trim()
    .notEmpty()
    .withMessage(`Last name ${emptyError}`)
    .isAlpha()
    .withMessage(`Last name ${alphaError}`),
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
    .withMessage(`Password ${strongPasswordError}`)
    .isLength({ max: 24 })
    .withMessage(maxLengthError),
  body("confirmPassword")
    .trim()
    .notEmpty()
    .withMessage(`Confirm password ${emptyError}`)
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
    .withMessage(`Confrim password ${strongPasswordError}`)
    .isLength({ max: 24 })
    .withMessage(maxLengthError)
    .custom((value, { req }) => value === req.body.password)
    .withMessage("The two passwords don't match"),
];

const signUpFormGet = (req, res) => res.render("sign_up.ejs");

const signUpFormPost = [
  validateUser,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).render("sign_up.ejs", { errors: errors.array() });
    await db.insertUser(matchedData(req));
    res.render("sign_up.ejs");
  },
];

module.exports = {
  signUpFormGet,
  signUpFormPost,
};
