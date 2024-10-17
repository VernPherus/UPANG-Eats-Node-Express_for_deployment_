const mysql = require("mysql2");
const fs = require("fs");
const path = require("path");

exports.createDatabase = async () => {
  try {
    const connection = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "upang_eats",
      multipleStatements: true,
    });

    const dumpFilePath = path.join(__dirname, "upang_eats.sql");
    const sqlDump = fs.readFileSync(dumpFilePath, "utf8");

    await connection.promise().query(sqlDump);
    console.log("Database and tables created successfully!");
  } catch (err) {
    console.error("Error creating database: ", err);
  }
};
