import * as winston from 'winston';

const timeStringFormat = () => (new Date()).toLocaleTimeString();

export default new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({
      timestamp: timeStringFormat,
    }),
  ],
});
