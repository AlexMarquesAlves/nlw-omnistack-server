import * as cors from "cors";
import * as express from "express";
import routes from "./routes";
import path = require("path");

const app = express();
app.use(cors());
app.use(routes);
app.use(express.json());
app.use("/uploads", express.static(path.resolve(__dirname, "..", "uploads")));

const PORT = 3333;
app.listen(PORT, () =>
  console.log(`🚀 HTTP server is running on port: ${PORT}`)
);
