const express = require('express');
const app = express();
const path = require('path');

app.use('/api/discord', require('./api/discord'));

// app.use(express.static(path.join(__dirname, "..", "build")));
// app.use(express.static("public"));

app.get('/', (request, response) => {
  response.status(200).sendFile(path.join(__dirname, 'index.html'))
})

app.listen(5000, () => {
  console.info("Listening on port 5000");
});