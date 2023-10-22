const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const expressLayouts = require("express-ejs-layouts");
const app = express();
const sessionConfigration = require("./utils/sessions/sessionConfig.js");
const connectToDB = require("./config/database")();

const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer);

//static files
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", "views");
app.use(expressLayouts);
app.set("layout", "./layouts/main");

//routes
const authRouter = require("./routes/authRoutes");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json()); // to convert the body from json format to js object

sessionConfigration(app);

app.get("/", (req, res, next) => {
  res.render("index", { title: "Home", isLogged: false });
});
app.use("/", authRouter);

httpServer.listen(3000, () => {
  console.log("server is running on port 3000");
});
