const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "yoeltzumi@gmail.com",
    pass: "jomozxrmgtahkmji",
  },
});

const sendPasswordResetEmail = async (email, token) => {
  try {
    const mailOptions = {
      from: "yoeltzumi@gmail.com",
      to: email,
      subject: "Password Reset",
      text: "You have requested to reset your password. Click the link below to reset your password\n\n https://whatever",
    };
    await transporter.sendMail(mailOptions);
    console.log("Password reset email sent");
  } catch (error) {
    console.log("Error sending password reset email", error);
    throw error;
  }
};

module.exports = {
  sendPasswordResetEmail,
};
