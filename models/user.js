'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/hash')


module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.Subject, {foreignKey: 'user_id', through: 'UserSubjects'})
    }

    static totalCredits(model, userId) {
      return new Promise((resolve, reject) => {
        User.findOne({
          where: {id: userId},
          include: {
            model: model,
            through: {
              where: {
                is_taken: true
              }
            }
          }
        })
          .then(user => {
            let credits = 0;
            
            user.Subjects.forEach(subject => {
              credits += +subject.credits;
            })

            resolve(credits)
          })
          .catch(err => reject(err))
      })
    }

    fullname() {
      return this.firstName + ' ' + this.lastName
    }
  };
  User.init({
    username: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Username cannot be empty'  
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Password cannot be empty'
        }
      }
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    gender: DataTypes.STRING,
    email: DataTypes.STRING,
    birthPlace: DataTypes.STRING,
    birthDate: DataTypes.DATEONLY,
    profileImg: DataTypes.STRING,
    role: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate(userInstance, options) {
          userInstance.password = hashPassword(userInstance.password, 10)

          if (!userInstance.lastName) {
            userInstance.lastName = userInstance.firstName;
          }
      }
    }
  });
  return User;
};