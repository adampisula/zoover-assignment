import express from "express";
import dotenv from "dotenv";

new Promise(async (_res, _rej) => {
  dotenv.config();

  const PORT = process.env.PORT;

  const app = express();

  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
  });
});
