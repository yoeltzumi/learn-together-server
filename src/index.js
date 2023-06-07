const express = require("express");
const session = require("express-session");
const passport = require("passport");

const authRoute = require("./routes/auth");
require("./strategies/local");
require("./database");

const app = express();
const PORT = 3001;

app.set("view engine", "ejs");

app.use(express.json());
// app.use(express.urlencoded());
app.use(
  session({
    secret: "AAAAAAAAAAAAAAAAAAAAAAAAA",
    resave: false,
    saveUninitialized: false,
  })
);

app.use("/auth", authRoute);

app.use((req, res, next) => {
  if (req.session.user) next();
  else res.sendStatus(401);
});

app.use(passport.initialize());
app.use(passport.session());

app.listen(PORT, () => console.log(`Running Express Server on Port ${PORT}`));
