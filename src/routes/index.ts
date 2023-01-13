import * as express from "express";
import { Request, Response } from "express";

const routes = express.Router();

routes.get("/", (req: Request, res: Response) => {
  return res.json({ message: "Hello World!" });
});

export default routes;
