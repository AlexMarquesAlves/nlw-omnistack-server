import * as express from "express";
import { Request, Response } from "express";
import knex from "../database/connection";

const routes = express.Router();
const tableItems = "items";
const tablePoints = "points";
const tablePointItems = "point_items";
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

routes.post("/points", async (req: Request, res: Response) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { name, email, whatsapp, latitude, longitude, city, uf, items } =
    req.body;

  const transactions = await knex.transaction();

  const insertedIds = await transactions(tablePoints).insert({
    image: "image-fake",
    name,
    email,
    whatsapp,
    latitude,
    longitude,
    city,
    uf,
  });

  const point_id = insertedIds[0];

  const pointItems = items.map((item_id: number) => {
    return {
      item_id,
      point_id: point_id,
    };
  });

  await transactions(tablePointItems).insert(pointItems);

  return res.json({ success: true });
});

export default routes;
