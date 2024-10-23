import { Database } from 'better-sqlite3-helper';

const db = new Database({
  path: './data/database.db',
  memory: false,
  readonly: false,
  fileMustExist: false,
  WAL: true,
  migrate: {
    force: false,
    table: 'migration',
    migrationsPath: './migrations',
  },
});

export default db;
