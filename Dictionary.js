const express = require("express");
const app = express();
const path = require("path");

const db = require("./word.js");

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to database");
});

app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public", "/dict.html"));
});

app.get("/word", (req, res) => {
  var text = req.query.word;
  var sql = `SELECT * FROM entries WHERE word = '${text}'`;
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port "+PORT);
});