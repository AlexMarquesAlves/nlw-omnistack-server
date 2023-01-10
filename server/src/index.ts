import * as express from "express";
import { Request, Response } from "express";

const app = express();

app.get("/users", (req: Request, res: Response) => {
  console.log("Listagem de usuários");

  // JSON

  res.json(["Diego", "Cleiton", "Robson", "Daniel"]);
});

const PORT = 3333;
app.listen(PORT, () =>
  console.log(`🚀 HTTP server is running on port: ${PORT}`)
);
