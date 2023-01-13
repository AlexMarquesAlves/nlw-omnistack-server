import * as express from "express";
import routes from "./routes";

const app = express();
app.use(routes);
app.use(express.json());

const PORT = 3333;
app.listen(PORT, () =>
  console.log(`🚀 HTTP server is running on port: ${PORT}`)
);
