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
    res.send("vdfvvvfvfv");
  }
);

router.get("/logout", (res, req) => {
  req.logout();
  res.redirect("/login");
});

module.exports = router;
