import { createLogger, format, transports } from "winston";

export const logger = createLogger({
  level: "info",
  format: format.combine(format.json(), format.colorize()),
  transports: [new transports.Console()],
});
