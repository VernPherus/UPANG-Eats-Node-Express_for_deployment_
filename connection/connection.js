const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'upang_eats'
});

connection.connect((err) =>{
  if (err){
    console.error('error', err);
    throw err
  }
  console.log("Connected");
})

module.exports = connection.promise();