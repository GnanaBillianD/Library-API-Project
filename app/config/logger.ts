import pino from 'pino';
import moment from 'moment';

const logLevel = 'info';
const logConfig = {
  name: 'Library-API',
  level: logLevel,
  timestamp: () => `,"time":"${moment.utc()}"`,
  formatters: {
    level(lable: string, num: number) {
      return { level: lable };
    }
  }
};

const logger = pino(logConfig);

export default logger;
