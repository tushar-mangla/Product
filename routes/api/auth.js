const express = require("express");
const router = express.Router();
const passport = require("passport");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const googleAuth = require("../../passport/passport-google");
const localAuth = require("../../passport/passport-local");

const { ensureAuth, ensureGuest } = require("../../middleware/middleware");

dotenv.config({ path: "../../config/config.env" });

googleAuth(passport);
// localAuth(passport);

router.get(
  "/google",
  ensureGuest,
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  ensureAuth,
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    res.send("google auth successfull");
  }
);

router.get("/logout", (res, req) => {
  req.logout();
  res.redirect("/login");
});

router.post(
  "/",
  passport.authenticate("local", { failureRedirect: "/login" }),
  async (res, req) => {
    res.redirect("/");
  }
);

router.get("/login", (req, res) => {
  res.send("local auth successful");
});

router.get("/login", (req, res) => {
  res.re;
});

module.exports = router;
