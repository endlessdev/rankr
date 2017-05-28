const dotenv = require('dotenv');

dotenv.config();

export const Sequelize = require('sequelize');

export const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    timestamps: false,
});

let connectWithRetry = () => {
    return sequelize.authenticate()
        .then(() => {
            console.log('Connection has been established successfully.');
        })
        .catch(err => {
            console.log('Failed to connect to database on startup - retrying in 5 sec', err);
            setTimeout(connectWithRetry, 5000);
        });
};

connectWithRetry();