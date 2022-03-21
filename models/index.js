const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require("../config/config.json")[env];
const User = require("./users.js");
const Device = require("./devices.js");

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

User.init(sequelize);
Device.init(sequelize);

User.associate(db);
Device.associate(db);

module.exports = db;
