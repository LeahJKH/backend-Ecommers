//external imports
require("dotenv").config();
const path = require("path");
const express = require("express");
const app = express();
const router = express.Router();
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
//internal imports/middleware
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const connectDB = require("./config/dbConn");

const corsOptions = require("./config/corsOptions");
const verifyJWT = require("./middleware/verifyJWT");

connectDB();

app.use(logger);
app.use(cors(corsOptions));

const PORT = process.env.PORT || 3500;
//static files
app.use(express.static(path.join(__dirname, "./public")));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

//routes
app.use("/", require("./routes/root"));
//api
app.use("/users", require("./routes/api/users"));
app.use("/products", require("./routes/api/products"));
//registering and logging in
app.use("/register", require("./routes/register"));
app.use("/auth", require("./routes/auth"));
app.use(verifyJWT);
app.use("/refresh", require("./routes/refresh"));
app.use("/logout", require("./routes/logout"));

//catch-all 404 response page
app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "pages", "404.html"));
  } else if (res.accepts("json")) {
    res.json({ error: "404 jason not found" });
  } else req.accepts("txt");
  {
    res.type("txt").send("404 text not found");
  }
});

app.use(errorHandler);

//connect to database, check connection and log confirmation of connection and port once
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB Database");
  app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
});
