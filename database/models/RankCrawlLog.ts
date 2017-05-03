const database = require('../index'),
    sequelize = database.sequelize,
    Sequelize = database.Sequelize;

exports.model = sequelize.define('rank_crawl_logs', {
    idx: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    }
}, {
    timestamps: false,
});
