'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserSubject extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  UserSubject.init({
    user_id: DataTypes.INTEGER,
    subject_id: DataTypes.INTEGER,
    is_taken: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'UserSubject',
  });
  return UserSubject;
};