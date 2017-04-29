'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {

        return queryInterface.createTable(
            'rank_logs_daum',
            {
                rank_crawl_idx: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
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
                },
                status: {
                    type: Sequelize.ENUM('up', 'down', 'new')
                },
                value: {
                    type: Sequelize.INTEGER,
                    allowNull: true
                }
            }
        )

    },

    down: function (queryInterface, Sequelize) {
        return queryInterface.dropTable('rank_logs_daum')
    }
};
