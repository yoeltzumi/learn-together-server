const { Router } = require("express");
const passport = require("passport");

const User = require("../database/schemas/User");
const { hashPassword, comparePassword } = require("../utils/helpers");

const router = Router();

router.post("/login", passport.authenticate("local"), (req, res) => {
  console.log("Logged in");
  res.sendStatus(200);
});

router.post("/register", async (req, res) => {
  const { email } = req.body;
  const userDB = await User.findOne({ email });

  if (userDB) {
    res.status(400).send({ msg: "User already exists!" });
  } else {
    const password = hashPassword(req.body.password);
    console.log(password);
    const newUser = await User.create({ password, email });
    res.sendStatus(201);
  }
});

module.exports = router;
