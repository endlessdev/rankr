'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
     Add altering commands here.
     Return a promise to correctly handle asynchronicity.

     Example:
     return queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return queryInterface.createTable('rank_naver_logs', {
      idx: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      rank_crawl_idx: {
        type: Sequelize.INTEGER,
        references: {
          model: "rank_crawl_logs",
          key: "idx"
        },
        onDelete: "CASCADE"
      },
      title: {
        type: Sequelize.STRING
      },
      rank: {
        type: Sequelize.INTEGER
      }
    }, {
      timestamps: false,
    });
  },

  down: function (queryInterface, Sequelize) {
    /*
     Add reverting commands here.
     Return a promise to correctly handle asynchronicity.

     Example:
     return queryInterface.dropTable('users');
     */
    return queryInterface.dropTable('rank_naver_logs');
  }
};
