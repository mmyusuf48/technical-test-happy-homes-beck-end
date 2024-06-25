'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('project', [
      {
        id: '459ebcb8-b2a9-406e-b77d-32ce37f2fb4a',
        name: 'Desain Ui',
        is_delete: false
      },
      {
        id: 'a2da8b3f-cf4d-4f26-92bb-68c32e380ccc',
        name: 'Aplikasi Website',
        is_delete: false
      },
      {
        id: '537ada08-38aa-4864-8a63-fa251f909e53',
        name: 'Asisten virtual',
        is_delete: false
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('project', null, {});
  }
};
