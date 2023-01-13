import { Request, Response } from "express";
import knex from "../database/connection";

const tablePoints = "points";
const tableItems = "items";
const tablePointItems = "point_items";

export class PointsController {
  async index(req: Request, res: Response) {
    const { city, uf, items } = req.query;

    const parsedItems = String(items)
      .split(",")
      .map((item) => Number(item.trim()));

    const points = knex(tablePoints)
      .join(tablePointItems, `${tablePoints}.id`, `${tablePointItems}.point_id`)
      .whereIn(`${tablePointItems}.item_id`, parsedItems)
      .where("city", String(city))
      .where("uf", String(uf))
      .distinct()
      .select(`${tablePoints}.*`);

    return res.json(points);
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;

    const point = await knex(tablePoints).where("id", id).first();

    if (!point) {
      return res.status(400).json({ message: "Point not found" });
    }

    const items = await knex(tableItems)
      .join(
        tablePointItems,
        `${tableItems}.id`,
        "=",
        `${tablePointItems}.item_id`
      )
      .where(`${tablePointItems}.point_id`, id)
      .select(`${tableItems}.title`);

    return res.json({ point, items });
  }

  async create(req: Request, res: Response) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { name, email, whatsapp, latitude, longitude, city, uf, items } =
      req.body;

    const transactions = await knex.transaction();

    const point = {
      image:
        "https://images.unsplash.com/photo-1562077981-4d7eafd44932?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=60",
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

    await transactions.commit();

    return res.json({ id: point_id, ...point });
  }
}
