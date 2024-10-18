const express = require("express");
const app = express();
const port = 3000;
const apiRoutes = require("./routes/apiRoutes");
const createDatabase = require("./db/createDatabase");
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(bodyParser.json());

app.use(cors());

createDatabase
  .createDatabase()
  .then(() => {
    app.get("/", (req, res) => {
      res.send("Hello World");
    });

    app.use("/", apiRoutes);

    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}/`);
    });
  })
  .catch((err) => {
    console.err("Error creating database: ", err);
    process.exit(1);
  });
