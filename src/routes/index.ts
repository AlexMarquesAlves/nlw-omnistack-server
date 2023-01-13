import * as express from "express";
import { Request, Response } from "express";
import { PointsController } from "../controllers/PointsController";
import knex from "../database/connection";

const routes = express.Router();
const tableItems = "items";
const pointsController = new PointsController();
const static_url = "http://localhost:3333";
const image_base_url = `${static_url}/uploads`;

routes.get("/items", async (req: Request, res: Response) => {
  const items = await knex(tableItems).select("*");
  const serializedItems = items.map((item) => {
    return {
      id: item.id,
      title: item.title,
      image_url: `${image_base_url}/${item.image}`,
    };
  });

  return res.json(serializedItems);
});

routes.post("/points", pointsController.create);

export default routes;
