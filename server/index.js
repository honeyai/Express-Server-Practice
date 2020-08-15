const express = require('express');
const app = express();
const path = require('path')

app.use(express.static("public"))

app.listen(5000, () => {
  console.info("Listening on port 5000");
});