const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const todoHandler = require("./routeHandler/todoHandler");
const userHandler = require("./routeHandler/userHandler");

// express app initialization
const app = express();
dotenv.config();
app.use(express.json());

// Database connection with mongoose
mongoose.set("strictQuery", false);
mongoose
  .connect("mongodb://localhost/todos")
  .then(() => console.log("Connection successful"))
  .catch((err) => console.log(err));

// application routes
app.use("/todo", todoHandler);
app.use("/user", userHandler);

// default error handler
const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).json({ error: err });
};

app.use(errorHandler);

app.listen(3000, () => {
  console.log("app listening at port 3000");
});
