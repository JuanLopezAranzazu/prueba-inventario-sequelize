const { Model, DataTypes, Sequelize } = require("sequelize");
const POSITION = "position";

const PositionSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  created_at: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
};

class Position extends Model {
  static associate(models) {
    this.hasMany(models.Employee, {
      foreignKey: "position_id",
      as: "employees",
    });
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: POSITION,
      modelName: "Position",
      timestamps: false,
    };
  }
}

module.exports = { POSITION, PositionSchema, Position };
