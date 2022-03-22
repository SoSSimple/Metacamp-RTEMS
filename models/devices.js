const Sequelize = require("sequelize");

module.exports = class Device extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        deviceName: {
          type: Sequelize.STRING(40),
          allowNull: true,
        },
        readyState: {
          type: Sequelize.BOOLEAN,
          defaultValue: 0,
        },
        operatingState: {
          type: Sequelize.BOOLEAN,
          defaultValue: 0,
        },
        startedAt: {
          type: Sequelize.DATE,
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: "Device",
        tableName: "devices",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {
    db.Device.belongsToMany(db.User, {
      through: "DeviceLog",
      as: "DeviceLogs",
      foreignKey: "DeviceId",
    });
  }
};
