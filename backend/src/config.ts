import "dotenv/config";

interface Config {
  port: number;
  dbUri: string;
  nodeEnv: string;
}

const config: Config = {
  port: Number(process.env.PORT) || 5000,
  dbUri: process.env.DATABASE_URL || "sqlite::memory:",
  nodeEnv: process.env.NODE_ENV || "development",
};

export default config;
