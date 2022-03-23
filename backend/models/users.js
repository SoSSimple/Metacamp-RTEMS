const Sequelize = require("sequelize");

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        name: {
          type: Sequelize.STRING(40),
          allowNull: true,
        },
        userId: {
          type: Sequelize.STRING(100),
          allowNull: false,
          unique: true,
        },
        password: {
          type: Sequelize.STRING(200),
          allowNull: false,
        },
        role: {
          type: Sequelize.STRING(100),
          defaultValue: "worker",
        },
        department: {
          type: Sequelize.STRING(20),
          allowNull: true,
          defaultValue: "dev",
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: "User",
        tableName: "users",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {
    db.User.belongsToMany(db.Device, {
      through: "DeviceLog",
      as: "DeviceUserLogs",
      foreignKey: "UserId",
    });
  }
};
