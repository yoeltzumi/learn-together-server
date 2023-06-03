const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://admin:admin@learn-together.iwfunc3.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log(err));