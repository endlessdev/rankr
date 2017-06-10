const database = require('../index');
const sequelize = database.sequelize;
const Sequelize = database.Sequelize;

export let model = sequelize.define('rank_naver_logs', {
  idx: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  rank_crawl_idx: {
    type: Sequelize.INTEGER,
    references: {
      model: 'rank_crawl_logs',
      key: 'idx',
    },
    onDelete: 'CASCADE',
  },
  title: {
    type: Sequelize.STRING,
  },
  rank: {
    type: Sequelize.INTEGER,
  },
}, {
  timestamps: false,
});
