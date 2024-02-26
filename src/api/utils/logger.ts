import * as winston from "winston";

// Logger
const logger = winston.createLogger({
  level: "info",
  format: winston.format.simple(),
  transports: [new winston.transports.Console()],
});
export default logger;
