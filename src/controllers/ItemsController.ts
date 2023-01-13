import { Request, Response } from "express";
import knex from "../database/connection";

const tableItems = "items";
const static_url = "http://localhost:3333";
const image_base_url = `${static_url}/uploads`;

export class ItemsController {
  async index(req: Request, res: Response) {
    const items = await knex(tableItems).select("*");
    const serializedItems = items.map((item) => {
      return {
        id: item.id,
        title: item.title,
        image_url: `${image_base_url}/${item.image}`,
      };
    });

    return res.json(serializedItems);
  }
}
