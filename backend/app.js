const express = require("express");
const morgan = require("morgan");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const nunjucks = require("nunjucks");
const cors = require("cors");

const Influx = require("influx");
const os = require("os");

const app = express();
const PORT = 8080;

// routing
const usersRoute = require("./routes/users.js");
const devicesRoute = require("./routes/devices.js");
const influxRoute = require("./routes/influx.js");
const mqttRoute = require("./routes/mqtt.js");

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

// InfluxDB
const influx = new Influx.InfluxDB({
  host: "localhost",
  database: "database_rtems",
  schema: [
    {
      measurement: "response",
      fields: {
        path: Influx.FieldType.STRING,
        time: Influx.FieldType.INTEGER,
      },
      tags: ["host"],
    },
  ],
});

influx
  .getDatabaseNames()
  .then((names) => {
    console.log("influx database connection success");
    if (!names.includes("database_rtems")) {
      return influx.createDatabase("database_rtems");
    }
  })
  .catch((err) => {
    console.error(`error creating influx database ${err}`);
  });

// passport set
passportConfig();

app.set("view engine", "html");
nunjucks.configure("views", {
  express: app,
  watch: true,
});

app.use(cors("http://localhost:3000"));

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "OPTIONS, GET, POST, PUT, DELETE"
//   );
//   next();
// });

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

app.use("/mqtt://220.90.129.56:1883", mqttRoute);
app.use("/influx", influxRoute);
app.use("/users", usersRoute);
app.use("/devices", devicesRoute);

app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== "production" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

app.listen(PORT, () => {
  console.log(PORT, "번에서 대기 중");
});
