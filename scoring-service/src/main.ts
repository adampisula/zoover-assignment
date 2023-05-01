import express from "express";
import dotenv from "dotenv";
import { AppContext } from "./types/appContext";
import { DataServiceReviewRepository } from "./repositories/dataServiceRepository";
import { scoreRouter } from "./routes/score";

new Promise(async (_res, _rej) => {
  dotenv.config();

  const PORT = process.env.PORT;

  const app = express();

  const appContext: AppContext = {
    repositories: {
      Review: new DataServiceReviewRepository(),
    },
  };

  // Mount context to request
  app.use((req: any, _res, next) => {
    req.context = appContext;
    next();
  });

  // Add routes
  app.use(scoreRouter);

  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
  });
});
