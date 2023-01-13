import { Request, Response } from "express";
import knex from "../database/connection";

const tablePoints = "points";
const tablePointItems = "point_items";

export class PointsController {
  async create(req: Request, res: Response) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { name, email, whatsapp, latitude, longitude, city, uf, items } =
      req.body;

    const transactions = await knex.transaction();

    const point = {
      image: "image-fake",
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
    };

    const insertedIds = await transactions(tablePoints).insert(point);

    const point_id = insertedIds[0];

    const pointItems = items.map((item_id: number) => {
      return {
        item_id,
        point_id: point_id,
      };
    });

    await transactions(tablePointItems).insert(pointItems);

    return res.json({ id: point_id, ...point });
  }
}
