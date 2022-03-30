const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require("../config/config.json")[env];
const User = require("./users.js");
const Device = require("./devices.js");
const Result = require("./results.js");
const Pause = require("./pause.js");
const dotenv = require("dotenv");

dotenv.config();

const db = {
  username: process.env.DB_ID,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: process.env.DB_DIALECT,
};
const sequelize = new Sequelize(db.database, db.username, db.password, {
  host: db.host,
  port: db.port,
  dialect: db.dialect,
});

db.sequelize = sequelize;

db.User = User;
db.Device = Device;
db.Result = Result;
db.Pause = Pause;

Result.init(sequelize);
User.init(sequelize);
Device.init(sequelize);
Pause.init(sequelize);

Result.associate(db);
User.associate(db);
Device.associate(db);
Pause.associate(db);

module.exports = db;
