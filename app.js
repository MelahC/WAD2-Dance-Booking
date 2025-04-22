require("dotenv").config(); 
const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.static(path.join(__dirname, "public")));

// creating simple route to test
app.get("/", (req, res) => {
  res.send("Hello Mr Robot 🤖 Dance 🕺💃 Dance 🕺💃 Dance 🕺💃");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});