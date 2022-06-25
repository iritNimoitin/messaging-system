const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);
const dotenv = require("dotenv");
dotenv.config();

mongoose.connect(process.env.DB_CONNECT);

mongoose.connection
  .once("open", () => console.log("connected"))
  .on("error", (error) => {
    console.log("your error", error);
  });
