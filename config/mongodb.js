const { MongoClient } = require("mongodb");

// connection URL
const url = process.env.DB_HOST || "mongodb://localhost:27017";
const client = new MongoClient(url);

// Database
const dbName = "market-db";
let database;

async function connect() {
  await client.connect();

  const db = client.db(dbName);
  database = db;

  console.log("Connect succesfully to server");
}

function getDatabase() {
  return database;
}

module.exports = { connect, getDatabase };
