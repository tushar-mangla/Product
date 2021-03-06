const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const {
  checkAuthenticated,
  checkNotAuthenticated,
} = require("../../middleware/middleware");

const User = require("../../models/User");

router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please enter a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { name, email, password } = req.body;
      // console.log(followers);

      try {
        let user = await User.findOne({ email });

        if (user) {
          return res
            .status(400)
            .json({ errors: [{ msg: "User already exists" }] });
        }

        const avatar = gravatar.url(email, {
          s: "200",
          r: "pg",
          d: "404",
        });

        user = new User({
          name,
          email,
          avatar,
          password,
        });

        // const salt = await bcrypt.genSalt(10);

        // user.password = await bcrypt.hash(password, salt);

        await user.save();

        res.send("User registered");
      } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
      }
    }
  }
);

module.exports = router;
