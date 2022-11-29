'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   return queryInterface.bulkInsert('Users',[{
      firstName :'Isha',
      lastName: 'Guravaleh',
      email: 'isha@gmail.com',
      password : 'Xornor@123',
      createdAt : new Date(),
      updatedAt : new Date()
   }],{});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users',null , {});
  }
  
};
