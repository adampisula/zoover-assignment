import { Request } from "express";
import { AppRequest } from "../types/appRequest";

import { Response, Router } from "express";
import { getCombinedScoreForAccommodation } from "../controllers/getCombinedScoreForAccommodation";

export const scoreRouter = Router();

scoreRouter.get("/score/:slug", async (req: Request, res: Response) => {
  const appReq = req as AppRequest;

  const slug = req.params["slug"];

  if (!slug) {
    return res.status(400).send("slug not present in query");
  }

  try {
    const combinedScore = await getCombinedScoreForAccommodation(appReq.context, slug.toString());
    return res.status(200).json(combinedScore);
  } catch (e) {
    return res.status(404).send("not found or unknown error");
  }
});
