const express = require("express");
const app = express();
const path = require("path");

app.use("/api/discord", require("./api/discord"));

// app.use(express.static(path.join(__dirname, "..", "build")));
// app.use(express.static("public"));

app.get("/", (request, response) => {
  response.status(200).sendFile(path.join(__dirname, "index.html"));
});

app.use((error, request, response, next) => {
  switch (error.message) {
    case "NoCodeProvided":
      return response.status(400).send({
        status: "ERROR",
        error: error.message,
      });
    default:
      return response.status(500).send({
        status: "ERROR",
        error: error.message,
      });
  }
});

app.listen(5000, () => {
  console.info("Listening on port 5000");
});
