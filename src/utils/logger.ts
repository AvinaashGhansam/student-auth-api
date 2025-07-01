import { createLogger, format, transports } from "winston";

/**
 * A logger package to help with logging.
 */
export const logger = createLogger({
  level: "info",
  format: format.combine(format.json(), format.colorize()),
  transports: [new transports.Console()],
});
