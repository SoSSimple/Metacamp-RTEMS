const express = require("express");

const app = express();
const PORT = 8080;

// routing
const usersRoute = require("./routes/users.js");

app.get("/", (req, res, next) => {
  res.send("<h1>express test</h1>");
});

app.use("/users", usersRoute);

app.listen(PORT, () => {
  console.log(PORT, "번에서 대기 중");
});
