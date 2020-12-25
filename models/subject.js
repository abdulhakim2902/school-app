'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Subject extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Subject.belongsToMany(models.User, {foreignKey: 'subject_id', through: 'UserSubjects'})
    }
  };
  Subject.init({
    name: DataTypes.STRING,
    lecturer: DataTypes.STRING,
    credits: DataTypes.INTEGER,
    maxStudents: DataTypes.INTEGER,
    quota: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Subject',
  });
  return Subject;
};