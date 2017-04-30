'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {
        /*
         Add altering commands here.
         Return a promise to correctly handle asynchronicity.

         Example:

         return queryInterface.createTable('users', { id: Sequelize.INTEGER });
         */
        return queryInterface.createTable('rank_crawl_logs', {
            idx: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            type: {
                type: Sequelize.ENUM('naver', 'nate', 'daum')
            },
            createdAt: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.NOW
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
        return queryInterface.dropTable('rank_crawl_logs');
    }
};
