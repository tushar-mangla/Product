const User = require("../models/User");
const bcrypt = require("bcryptjs");
const localStrategy = require("passport-local");

module.exports = function (passport) {
  passport.use(
    new localStrategy((email, password, done) => {
      User.findOne({ email: user.email }, (err, user) => {
        if (err) throw err;

        if (!user) return done(null, false, { message: "Incorrect email..." });

        bcrypt.compare(password, user.password, (err, result) => {
          if (err) throw err;
          if (result === true) {
            return done(null, user, { message: "successfulle login..." });
          } else {
            return done(null, false, { message: "Incorrect password...." });
          }
        });
      });
    })
  );

  passport.serializeUser((user, cb) => {
    cb(null, user.id);
  });
  passport.deserializeUser((id, cb) => {
    User.findOne({ _id: id }, (err, user) => {
      const userInformation = {
        username: user.username,
      };
      cb(err, userInformation);
    });
  });
};
