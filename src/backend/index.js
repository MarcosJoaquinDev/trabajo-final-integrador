require("dotenv").config();

const express = require("express");
const userRouter = require("./routes/users.js");
const menuRouter = require("./routes/menu.js");

function main() {
  const app = express();
  const port = process.env.PORT || 3000;

  app.use(express.json());

  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    if (req.method === "OPTIONS") return res.sendStatus(204);
    next();
  });

  app.use("/users", userRouter);
  app.use("/menu", menuRouter);

  app.listen(port, () => {
    console.log(`Backend escuchando en http://localhost:${port}`);
  });
}

main();
