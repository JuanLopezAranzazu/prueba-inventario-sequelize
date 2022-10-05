const { Model, DataTypes, Sequelize } = require("sequelize");
const DEVICE = "device";

const DeviceSchema = {
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
  description: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  created_at: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
};

class Device extends Model {
  static associate(models) {
    this.belongsToMany(models.Employee, {
      through: "device_employee",
      foreignKey: "device_id",
      as: "employees",
      otherKey: "employee_id",
    });
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: DEVICE,
      modelName: "Device",
      timestamps: false,
    };
  }
}

module.exports = { DEVICE, DeviceSchema, Device };
