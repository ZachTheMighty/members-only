const { Client } = require("pg");
const { argv } = require("node:process");

const SQL = `
CREATE TABLE users (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    first_name VARCHAR (255),
    last_name VARCHAR (255),
    email VARCHAR (255),
    password VARCHAR (255),
    membership_status BOOLEAN DEFAULT FALSE
)
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: argv[2] || process.env.DATABASE_URL,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
