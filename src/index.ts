import { Person } from "@/person";
import * as express from "express";
import { Request, Response } from "express";

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.send(new Person().sayHello());
});

const PORT = 3001;
app.listen(PORT, () =>
  console.log(`🚀 HTTP server is running on port: ${PORT}`)
);
