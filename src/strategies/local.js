const passport = require("passport");
const { Strategy } = require("passport-local");

const User = require("../database/schemas/User");
const { comparePassword } = require("../utils/helpers");

passport.serializeUser((user, done) => {
  console.log("Serializing User...");
  console.log(user);
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  console.log("Deserializing User...");
  console.log(id);
  try {
    const user = await User.findById(id);
    if (!user) throw new Error("User not found");
    done(null, user);
  } catch (error) {
    console.log(error);
    done(error, null);
  }
});

passport.use(
  new Strategy(
    {
      usernameField: "userId",
      passReqToCallback: true,
    },
    async (req, userId, password, done) => {
      try {
        const { role } = req.body;
        if (!userId || !password || !role)
          throw new Error("Missing credentials");
        const userDB = await User.findOne({ userId });
        if (!userDB) {
          throw new Error("משתמש לא נמצא");
        }
        const isValid =
          comparePassword(password, userDB.password) && role === userDB.role;
        if (isValid) {
          console.log("Authenticated Successfully");
          done(null, userDB);
        } else {
          console.log("Invalid Authentication");
          done(null, null);
        }
      } catch (error) {
        console.log(error);
        done(error, null);
      }
    }
  )
);
