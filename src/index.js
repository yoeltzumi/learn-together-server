const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const authRoute = require("./routes/auth");
require("./database/index");

const app = express();
const PORT = 3001;

app.use(express.json());
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

app.listen(PORT, () => console.log(`Running Express Server on Port ${PORT}`));
