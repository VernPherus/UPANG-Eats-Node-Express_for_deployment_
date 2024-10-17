const express = require("express");
const app = express();
const port = 3000;
const apiRoutes = require("./routes/apiRoutes");
const createDatabase = require("./db/createDatabase");
const bodyParser = require("body-parser");
const cors = require("cors");

createDatabase.createDatabase();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use(bodyParser.json());

app.use(cors());

app.use("/", apiRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
