const { Pool } = require("pg");
const { loadEnvFile } = require("node:process");

try {
  loadEnvFile();
} catch (error) {
  if (error.code !== "ENOENT") throw error;
}

const ENV = process.env;

module.exports = new Pool({
  connectionString:
    ENV.DATABASE_PUBLIC_URL ||
    `postgresql://${ENV.USER}:${ENV.PASSWORD}@${ENV.HOST}:${ENV.DATABASE_SERVER_PORT}/${ENV.DATABASE}`,
});
