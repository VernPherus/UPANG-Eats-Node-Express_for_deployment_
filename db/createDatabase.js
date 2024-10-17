const mysql = require("mysql2");

exports.createDatabase = async () => {
  const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "upang_eats",
  });

  const sql = `
  -- Create upang_eats database
  CREATE DATABASE IF NOT EXISTS upang_eats;
  USE upang_eats;

  --Table Structure for table 'bookmarks'

  CREATE TABLE bookmarks(
    bookmark_id int(11) NOT NULL,
    user_id int(11) DEFAULT NULL, 
    item_id int(11) DEFAULT NULL,
    stall_id int(11) DEFAULT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

  --Dump data for table 'bookmarks'


  `;
};
