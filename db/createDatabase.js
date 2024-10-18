const mysql = require("mysql2");
const fs = require("fs");
const path = require("path");

exports.createDatabase = async () => {
  try {
    const connection = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      multipleStatements: true,
    });

    const dbName = "upang_eats";

    sqlCreate = `
      CREATE DATABASE IF NOT EXISTS ${dbName}; 
      USE ${dbName};
    `;

    connection.query(sqlCreate, (err, result) => {
      if (err) {
        console.error("Error creating database:", err.stack);
        return;
      }
      console.log(`Database "${dbName}" created successfully`);
    });

    const dumpFilePath = path.join(__dirname, "upang_eats.sql");
    const sqlDump = fs.readFileSync(dumpFilePath, "utf8");

    await connection.promise().query(sqlDump);
    console.log("Database and tables created successfully!");
  } catch (err) {
    console.error("Error creating database: ", err);
  }
};
