/* eslint-disable quotes */
import * as winston from "winston";

//
const logger = winston.createLogger({
  level: "info" /* eslint-disable quotes */,
  format: winston.format.simple(),
  transports: [new winston.transports.Console()],
});
export default logger;
