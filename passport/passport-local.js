// const User = require("../models/User");
// const bcrypt = require("bcryptjs");
// const localStrategy = require("passport-local").Strategy;

// module.exports = function (passport) {
//   passport.use(
//     new localStrategy((email, password, done) => {
//       User.findOne({ email: email }, (err, user) => {
//         if (err) throw err;

//         if (!user) return done(null, false, { message: "Incorrect email..." });

//         if (user.password != password) {
//           return done(null, false, { message: "incorrect pass...." });
//         }
//         return done(null, user, { message: "sucessfully login,," });
//       });
//     })
//   );

//   passport.serializeUser((user, done) => {
//     done(null, user.id);
//   });
//   passport.deserializeUser((id, done) => {
//     User.findOne({ _id: id }, (err, user) => {
//       const userInformation = {
//         username: user.username,
//       };
//       done(err, userInformation);
//     });
//   });
// };

const passport = require("passport");
//const LocalStrategy = require('passport-google-oauth20').Strategy;
LocalStrategy = require("passport-local").Strategy;

const mongoose = require("mongoose");
const dotenv = require("dotenv");
//const localStrategy=require('passport-local').Strategy
const User = require("../models/User");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    function (email, password, done) {
      User.findOne({ email: email }, function (err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, { message: "Incorrect username" });
        }

        if (!(user.password === password)) {
          return done(null, false, { message: "Incorrect password" });
        }
        return done(null, user);
      });
    }
  )
);

module.exports = passport;

// const User = require("../models/User");
// const localStrategy = require("passport-local").Strategy;

// module.exports = function (passport) {
//   passport.use(
//     new localStrategy((email, password, done) => {
//       User.findOne({ email: email }, (err, user) => {
//         if (err) return done(err);
//         if (!user) return done(null, false);
//         if (!(user.passpord === password)) {
//           return done(null, false);
//         }
//         return done(null, user);
//       });
//     })
//   );

//   passport.serializeUser((user, cb) => {
//     cb(null, user.id);
//   });
//   passport.deserializeUser((id, cb) => {
//     User.findOne({ _id: id }, (err, user) => {
//       const userInformation = {
//         username: user.username,
//       };
//       cb(err, userInformation);
//     });
//   });
// };
// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser((id, done) => {
//   User.findById(id, (err, user) => done(err, user));
// });
