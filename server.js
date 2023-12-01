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
//app.use(verifyJWT); //verify authorization
app.use("/users", require("./routes/user"));
app.use("/auth", require("./routes/auth"));
app.use("/refresh", require("./routes/refresh"));

//catch-all 404 response page
app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "view", "404.html"));
  } else if (res.accepts("json")) {
    res.json({ error: "404 Jason Not Found" });
  } else req.accepts("txt");
  {
    res.type("txt").send("404 text not found");
  }
});

app.use(errorHandler);
//confirm server is running and on which port
app.listen(PORT, () => console.log(`server is running on port ${PORT}`));

/*const getProducts = () => {
  fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((json) => console.log(json));
};

getProducts();*/
