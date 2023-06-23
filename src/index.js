require("dotenv").config();
const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const passport = require("passport");
const cors = require("cors");
const bodyParser = require("body-parser");

const authRoute = require("./routes/auth");
const testsRoute = require("./routes/tests");
require("./strategies/local");
require("./database");

const app = express();
const PORT = 3001;

app.set("view engine", "ejs");

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: "AAAAAAAAAAAAAAAAAAAAAAAAA",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URL,
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRoute);
app.use("/tests", testsRoute);

app.listen(PORT, () => console.log(`Running Express Server on Port ${PORT}`));
