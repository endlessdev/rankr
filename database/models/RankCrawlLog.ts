const database = require('../index'),
    sequelize = database.sequelize,
    Sequelize = database.Sequelize;

exports.model = sequelize.define('rank_crawl_logs', {
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
