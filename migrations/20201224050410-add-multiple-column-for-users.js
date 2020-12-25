'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return Promise.all([
      queryInterface.addColumn('Users', 'firstName', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('Users', 'lastName', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('Users', 'email', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('Users', 'gender', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('Users', 'birthPlace', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('Users', 'birthDate', {
        type: Sequelize.DATEONLY
      }),
      queryInterface.addColumn('Users', 'profileImg', {
        type: Sequelize.STRING
      })
    ])
  },

  down: (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return Promise.all([
      queryInterface.removeColumn('Users', 'firstName'),
      queryInterface.removeColumn('Users', 'lastName'),
      queryInterface.removeColumn('Users', 'email'),
      queryInterface.removeColumn('Users', 'gender'),
      queryInterface.removeColumn('Users', 'birthPlace'),
      queryInterface.removeColumn('Users', 'birthDate'),
      queryInterface.removeColumn('Users', 'profileImg')
    ])
  }
};
