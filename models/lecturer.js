'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Lecturer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Lecturer.hasMany(models.Subject, {foreignKey: 'lecturer_id'})
    }
  };
  Lecturer.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Lecturer',
  });
  return Lecturer;
};