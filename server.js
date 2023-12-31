//external imports
require("dotenv").config();
const path = require("path");
const express = require("express");
const app = express();
const router = express.Router();
const cors = require("cors");
const cookieParser = require("cookie-parser");
//internal imports/middleware
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const corsOptions = require("./config/corsOptions");
const verifyJWT = require("./middleware/verifyJWT");

const PORT = process.env.PORT || 3500;

//Middleware
app.use(logger);
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//static files
app.use(express.static(path.join(__dirname, "./public")));

//root
app.use("/", require("./routes/root"));
//routes
app.use("/users", require("./routes/user"));
app.use("/auth", require("./routes/auth"));
app.use(verifyJWT);
app.use("/refresh", require("./routes/refresh"));
app.use("/logout", require("./routes/logout"));

//catch-all 404 response page
app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    return res.sendFile(path.join(__dirname, "pages", "404.html"));
  } else if (res.accepts("json")) {
    return res.json({ error: "404 Jason Not Found" });
  } else req.accepts("txt");
  {
    return res.type("txt").send("404 text not found");
  }
});

app.use(errorHandler);
//confirm server is running and on which port
app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
