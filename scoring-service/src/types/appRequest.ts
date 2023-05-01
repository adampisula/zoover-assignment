import { Request } from "express";
import { AppContext } from "./appContext";

export interface AppRequest extends Request {
  context: AppContext;
}
