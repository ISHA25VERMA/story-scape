// Update with your config settings.
import { dirname } from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PGDB_PASSWORD = process.env.PGDB_PASSWORD;

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

const config = {
  development: {
    client: "postgresql",
    connection: {
      host: "localhost",
      database: "jira-clone",
      user: "postgres",
      password: "",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
      directory: `${__dirname}/db/migrations`,
    },
    seeds: {
      directory: `${__dirname}/db/seeds`,
    },
  },
};

export default config;
