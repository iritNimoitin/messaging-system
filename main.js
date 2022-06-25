const express = require("express");

const messageRouter = require("./routers/messageRouter");
const authRouter = require("./routers/authRauter");

const cors = require("cors");
const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

require("./configs/database");

app.use("/api/message", messageRouter);
app.use("/api/user", authRouter);

app.listen(process.env.PORT || 8000);
