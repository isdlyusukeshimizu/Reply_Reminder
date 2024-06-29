var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
//
const http = require('http');
const socketIo = require('socket.io');
const session = require("express-session");
//
var indexRouter = require("./routes/index");
var registrationRouter = require("./routes/registration");
var statusRouter = require("./routes/status");
var studentsRouter = require("./routes/students");
var teacherRouter = require("./routes/teacher");

var app = express();
//
const server = http.createServer(app);
const io = socketIo(server);
//
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
//
app.use(session({
  secret: 'ice_number1', 
  resave: false,
  //saveUninitialized: true,
  saveUninitialized: true
  //cookie: { secure: false } // HTTPSを使う場合はtrueに変更
}));
//
app.use("/", indexRouter);
app.use("/registration", registrationRouter);
app.use("/status", statusRouter);
app.use("/students", studentsRouter);
app.use("/teacher", teacherRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
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
//
io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});
//
module.exports = app;
