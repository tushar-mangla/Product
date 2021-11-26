const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const session = require("express-session");
const passport = require("passport");
const googleAuth = require("./passport/passport-google");
const localAuth = require("./passport/passport-local");

dotenv.config({
  path: "./config/config.env",
});

const app = express();

googleAuth(passport);

//connect db
connectDB();

//init midleware
app.use(express.json({ extended: false }));

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => res.send("API Running"));

app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/post", require("./routes/api/post"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on ${PORT}`));
