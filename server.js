const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const expressLayouts = require("express-ejs-layouts");
const app = express();
const sessionConfigration = require("./utils/sessions/sessionConfig.js");
const connectToDB = require("./config/database");

const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer);
//models
const {User} = require("./models/userModel.js");
//static files
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", "views");
app.use(expressLayouts);
app.set("layout", "./layouts/main");

//routes
const homeRouter = require("./routes/homeRoutes.js");
const authRouter = require("./routes/authRoutes");
const profileRouter = require("./routes/profileRoutes.js");
const friendsRouter = require("./routes/friendRoutes.js");

//middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json()); // to convert the body from json format to js object

connectToDB();
sessionConfigration(app);
//a middleware to set  friendRequest in all pages that will render
app.use((req, res, next) => {
  if (req.session.userId) {
    User.findById(req.session.userId)
      .then((user) => {
        req.friendRequests = user.friendRequests;
        next();
      })
      .catch((err) => {
        next(err);
      });
  } else {
    next();
  }
});
app.use("/", homeRouter);
app.use("/", authRouter);
app.use("/profile", profileRouter);
app.use("/friend", friendsRouter);

//unhandled routes
app.all("*", (req, res, next) => {
  res.status(404);
  next(new Error(`can't find this page `));
});

//global error handler
app.use((error, req, res, next) => {
  res.status(500);
  res.render("error", {
    isLogged: req.session.userId,
    title: "Error",
    errMsg: error.message,
    friendRequests: req.friendRequests,
  });
});

//io
require("./sockets/friendSocket.js")(io); //if i add this line to the next middleware it will still for another connection not the frist connection and this is error
io.on("connection", (socket) => {
  require("./sockets/initSocket.js")(socket);
});

httpServer.listen(3000, () => {
  console.log("server is running on port 3000");
});
