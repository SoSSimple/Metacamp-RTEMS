const express = require("express");
const morgan = require("morgan");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

// routing
const usersRoute = require("./routes/users.js");
const devicesRoute = require("./routes/devices.js");

// passport
const passport = require("passport");
const passportConfig = require("./passport");

// Database Sequelize
const { sequelize } = require("./models");
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("database connection success");
  })
  .catch((err) => {
    console.error(`database connection failed ${err}`);
  });

const app = express();
const PORT = 3000;

// passport set
passportConfig();

app.use(morgan("dev"));
app.use("/", express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: "cookiesecret",
    cookie: {
      httpOnly: true,
      secure: false,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res, next) => {
  res.send("<h1>express test</h1>");
});

app.use("/users", usersRoute);
app.use("/devices", devicesRoute);

app.listen(PORT, () => {
  console.log(PORT, "번에서 대기 중");
});
