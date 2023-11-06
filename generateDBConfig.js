require('dotenv').config(); // Load environment variables from .env

const dbConfig = {
    defaultEnv: "db_migration",
    db_migration: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    database: process.env.DB_NAME,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    driver: "pg",
  },
  'sql-file': true,
};

const fs = require('fs');
fs.writeFileSync('database.json', JSON.stringify(dbConfig, null, 2));

console.log('database.json file generated successfully.');
