var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var artsRouter = require("./routes/arts");
var artistsRouter = require("./routes/artists");
var projectsRouter = require("./routes/projects");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/api/users", usersRouter);
app.use("/api/arts", artsRouter);
app.use("/api/artists", artistsRouter);
app.use("/api/projects", projectsRouter);

module.exports = app;
