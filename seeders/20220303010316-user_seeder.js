'use strict';
const bcrypt = require("bcryptjs");

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     await queryInterface.bulkInsert('Users', [{
        firstName: 'John',
        lastName: 'Doe',
        dateOfBirth: '1998-03-30',
        email: 'johndoe@test.com',
        phoneNumber: '23423345',
        password: await bcrypt.hash('password', 10), // use 'password' as login password
        token: null,
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
     }], {
       timestamp: true
     });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Users', null, {});
  }
};
