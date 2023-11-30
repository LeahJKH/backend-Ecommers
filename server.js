//external imports
require("dotenv").config();
const path = require("path");
const express = require("express");
const app = express();
const router = express.Router();
//internal imports/middleware
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");

const PORT = process.env.PORT || 3500;
app.use(logger);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//static files
app.use(express.static(path.join(__dirname, "./public")));

//root
app.use("/", require("./routes/root"));

app.use("/", require("./routes/register"));

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
//confirm server is running and on which port
app.listen(PORT, () => console.log(`server is running on port ${PORT}`));

/*const getProducts = () => {
  fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((json) => console.log(json));
};

getProducts();*/
