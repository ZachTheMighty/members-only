const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const db = require("../db/queries.js");
const bcrypt = require("bcryptjs");

const customFields = {
  usernameField: "email",
  passwordField: "password",
};

passport.use(
  new LocalStrategy(customFields, async (email, password, done) => {
    try {
      const user = await db.getUserByEmail(email);

      if (!user) return done(null, false, { message: "Incorrect email" });

      if (!(await bcrypt.compare(password, user.password)))
        return done(null, false, { message: "Incorrect password" });

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }),
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.getUserById(id);

    done(null, user);
  } catch (err) {
    done(err);
  }
});
