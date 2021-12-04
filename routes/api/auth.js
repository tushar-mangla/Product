const express = require("express");
const router = express.Router();
const passport = require("passport");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const googleAuth = require("../../passport/passport-google");
const localAuth = require("../../passport/passport-local");
const passportLocal = require("passport-local").Strategy;

const {
  checkAuthenticated,
  checkNotAuthenticated,
} = require("../../middleware/middleware");

dotenv.config({ path: "../../config/config.env" });

googleAuth(passport);

// localAuth(passport, (email)=> )

router.get(
  "/google",
  checkNotAuthenticated,
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  checkAuthenticated,
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    res.send("google auth successfull");
  }
);

router.delete("/logout", (req, res) => {
  req.logout();
  res.send("logout success");
});

router.post(
  "/",
  localAuth.authenticate("local", {
    failureRedirect: "/api/post",
  }),
  function (req, res) {
    // console.log(req.user);
    const id = req.user._id;

    res.redirect(`/api/profile/${id}`);
    // res.render("../../client/src/components/auth/login");
  }
);

router.get("/", (req, res) => {
  res.redirect("/api/auth");
});

// router.get("/login", (req, res) => {
//   res.re;
// });

module.exports = router;
