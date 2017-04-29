'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable(
            'rank_logs_naver',
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
                }
            }
        )

    },

    down: function (queryInterface, Sequelize) {
        return queryInterface.dropTable('rank_logs_naver')
    }
};
