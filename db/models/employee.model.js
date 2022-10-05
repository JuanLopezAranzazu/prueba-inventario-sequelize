const { Model, DataTypes, Sequelize } = require("sequelize");
const EMPLOYEE = "employee";
const { POSITION } = require("./position.model");

const EmployeeSchema = {
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
  email: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  contact_number: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  created_at: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
  position_id: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: POSITION,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
  },
};

class Employee extends Model {
  static associate(models) {
    this.belongsTo(models.Position, {
      foreignKey: "position_id",
      as: "position",
    });

    this.belongsToMany(models.Device, {
      through: "device_employee",
      foreignKey: "employee_id",
      as: "devices",
      otherKey: "device_id",
    });
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: EMPLOYEE,
      modelName: "Employee",
      timestamps: false,
    };
  }
}

module.exports = { EMPLOYEE, EmployeeSchema, Employee };
