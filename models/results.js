const Sequelize = require("sequelize");

module.exports = class Result extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        userId: {
          type: Sequelize.STRING(20),
          allowNull: true,
        },
        deviceId: {
          type: Sequelize.STRING(100),
          allowNull: true,
        },
        total: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        failedCount: {
          type: Sequelize.INTEGER,
        },
        yield: {
          type: Sequelize.STRING(10),
        },
        startedAt: {
          type: Sequelize.DATE,
        },
        endedAt: {
          type: Sequelize.DATE,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: "Result",
        tableName: "results",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {}
};
