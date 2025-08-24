import { Knex } from 'knex';

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'pg',
    connection: {
      host: process.env.SUPABASE_HOST || 'localhost',
      port: Number(process.env.SUPABASE_PORT) || 54322,
      user: process.env.SUPABASE_USER || 'postgres',
      password: process.env.SUPABASE_PASSWORD || 'postgres',
      database: process.env.SUPABASE_DB || 'postgres',
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations',
    },
    seeds: {
      directory: './seeds',
    },
  },
};
module.exports = config;
