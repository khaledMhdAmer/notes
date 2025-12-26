'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint('note_versions', {
      fields: ['note_id'],
      type: 'foreign key',
      name: 'note_versions_note_id_fkey',
      references: {
        table: 'notes',
        field: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('note_versions', 'note_versions_note_id_fkey');
  }
};

