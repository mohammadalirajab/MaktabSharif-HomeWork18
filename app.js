const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const { ValidationError } = require("express-validation");
const session = require("express-session");

const app = express();

// session configuration
app.use(
  session({
    key: "user_sid",
    secret: "srckey",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 1000 * 60 * 60, //60min
    },
  })
);

// DB connection
require("./database/connection");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", require("./routes/api"));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});
//  express-validation middleware
app.use(function (err, req, res, next) {
  if (err instanceof ValidationError) {
    if (err.details.body[0].message.includes("match the required pattern"))
      err.details.body[0].message =
        "The password must contain at least 1 numeric character.";
    if (req.originalUrl === "/auth/signin") {
      return res.render("signin", {
        error: err.details.body[0].message,
        successful: false,
      });
    }
    if (req.originalUrl === "/auth/signup") {
      return res.render("signup", {
        error: err.details.body[0].message,
        successful: false,
      });
    }
  }

  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
