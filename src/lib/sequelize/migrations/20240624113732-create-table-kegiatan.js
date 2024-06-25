'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('kegiatan', {
      id: {
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      start_date: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      end_date: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      start_time: {
        type: Sequelize.TIME,
        allowNull: false,
      },
      end_time: {
        type: Sequelize.TIME,
        allowNull: false,
      },
      activity: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      project_id: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      user_rate_id: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DataTypes.DATE(6),
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP(6)'),
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DataTypes.DATE(6),
        defaultValue: Sequelize.literal('NULL ON UPDATE CURRENT_TIMESTAMP(6)'),
        allowNull: true,
      },
      is_delete: {
        type: Sequelize.DataTypes.TINYINT,
        allowNull: false,
      },
    }, {
      timestamps: true,
      underscored: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('kegiatan');
  }
};
