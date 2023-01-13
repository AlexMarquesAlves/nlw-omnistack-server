import * as express from "express";
import { Request, Response } from "express";
import knex from "../database/connection";

const routes = express.Router();
const tableName = "items";
const static_url = "http://localhost:3333";
const image_base_url = `${static_url}/uploads`;

routes.get("/items", async (req: Request, res: Response) => {
  const items = await knex(tableName).select("*");
  const serializedItems = items.map((item) => {
    return {
      title: item.title,
      image_url: `${image_base_url}/${item.image}`,
    };
  });

  return res.json(serializedItems);
});

export default routes;
