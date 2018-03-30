

import * as yenv from 'yenv';
const env = yenv();

export const Sequelize = require('sequelize');

export const sequelize =
  new Sequelize(env.DB_DATABASE, env.DB_USER, env.DB_PASSWORD, {
    host: env.DB_HOST,
    dialect: env.DB_DIALECT,
    timestamps: false,
    logging: true,
  });

const connectWithRetry = () => {
  return sequelize.authenticate()
    .then(() => {
      console.log('Connection has been established successfully.');
    })
    .catch((err) => {
      console.log('Failed to connect to database on startup - retrying in 5 sec', (err));
      setTimeout(connectWithRetry, 5000);
    });
};

connectWithRetry();
