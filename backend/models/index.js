const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require("../config/config.json")[env];
const User = require("./users.js");
const Device = require("./devices.js");
const Result = require("./results.js");
const Pause = require("./pause.js");

const db = {};
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

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
