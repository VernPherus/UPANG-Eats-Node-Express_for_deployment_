const mysql = require("mysql2");
const fs = requrie("fs");
const path = require("path");

exports.createDatabase = async () => {
  try {
    const connection = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
    });

    const dumpFilePath = path.join(__dirname, "upang_eats.sql");
    const sqlDump = fs.reafFileSync(dumpFilePath, "utf8");

    await connection.promise().query(sqlDump);
    console.log("Database and tables created successfully!");
  } catch (err) {
    console.error("Error creating database: ", err);
  }
};
