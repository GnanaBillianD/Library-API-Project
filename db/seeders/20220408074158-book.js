'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('books', [
      {
        name: 'Outlander',
        category: 'historical',
        author: 'Diana Gabaldon',
        amount: 237.3,
        notes:
          'Outlander is a historical fantasy novel by Diana Gabaldon first published in 1991.',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Out',
        category: 'historical',
        author: 'Gabaldon',
        amount: 127.3,
        notes:
          'Out is a historical fantasy novel by Gabaldon first published in 1991.',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'hi',
        category: 'blog',
        author: 'beni',
        amount: 456.3,
        notes: ' hi is fantasy novel by beni first published in 1991.',
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('books', null, {});
  }
};
