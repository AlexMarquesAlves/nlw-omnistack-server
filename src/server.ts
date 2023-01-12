import * as express from "express";
import { Request, Response } from "express";

const app = express();

const users = ["Diego", "Cleiton", "Robson", "Daniel"];

app.get("/users", (req: Request, res: Response) => {
  const search = String(req.query.search);

  const filteredUsers = search
    ? users.filter((user) => user.includes(search))
    : users;

  return res.json(filteredUsers);
});

app.get("/users/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const user = users[id];

  return res.json(user);
});

app.post("/users", (req: Request, res: Response) => {
  const data = req.body;

  const user = {
    name: data.name,
    email: data.name,
  };

  return res.json(user);
});

const PORT = 3333;
app.listen(PORT, () =>
  console.log(`🚀 HTTP server is running on port: ${PORT}`)
);
