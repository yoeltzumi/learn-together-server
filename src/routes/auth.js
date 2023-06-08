const { Router } = require("express");
const passport = require("passport");
const crypto = require("crypto");
const bcrypt = require("bcrypt");

const User = require("../database/schemas/User");
const { hashPassword, comparePassword } = require("../utils/helpers");
const { sendPasswordResetEmail } = require("../utils/emailService");

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

router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const token = crypto.randomBytes(20).toString("hex");

    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000;

    await user.save();
    await sendPasswordResetEmail(email, token);

    res.status(200).json({ message: "Password reset email sent" });
  } catch (error) {
    res.status(500).json({ message: "error resetting password" });
  }
});

router.get("/reset-password/:token", async (req, res) => {
  const { token } = req.params;

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    res.render("resetPassword", { token, error: false, success: false });
    // res.status(200).json({message: "Good shit"})
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Error resetting password" });
  }
});

router.post("/reset-password/:token", async (req, res) => {
  console.log(req.body);
  console.log(req.params);
  const { token } = req.params;
  const { password } = req.body;

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    // res.status(200).json({ message: "Password reset successful" });
    res.status(200).render("resetPassword", { token, error: false, success: true });
  } catch (error) {
    res.status(500).render("resetPassword", { token, error: true, success: false });
  }
});

module.exports = router;
