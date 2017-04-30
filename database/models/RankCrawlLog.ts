const database = require('../database'),
    sequelize = database.sequelize,
    Sequelize = database.Sequelize;

export let model = sequelize.define('rank_crawl_logs', {
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
