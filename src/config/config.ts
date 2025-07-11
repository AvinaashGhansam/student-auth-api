import dotenv from "dotenv";
dotenv.config();

/**
 * the port specify in the environment
 */
const portEnv = process.env.PORT ? parseInt(process.env.PORT, 10) : NaN;
if (isNaN(portEnv) || portEnv <= 0) {
  throw new Error(`Invalid PORT value: ${process.env.PORT}`);
}

/**
 * Database URI validation
 */
const dbUriEnv = process.env.MONGODB_URI;
if (!dbUriEnv) {
  throw new Error("DB_URI must be defined");
}

/**
 * A config class to load all environment variables
 */
export class Config {
  public readonly apiPrefix: string;
  public readonly apiVersion: string;
  public readonly port: number;
  public readonly dbUri: string | undefined;

  constructor() {
    this.apiPrefix = process.env.API_PREFIX || "/api";
    this.apiVersion = process.env.API_VERSION || "v1";
    this.port = portEnv;
    this.dbUri = dbUriEnv;
  }
}
