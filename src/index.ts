import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { isAuthenticated } from "./middleware/auth.middleware";
import cors from "cors";

import router from "./routes";
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  console.log("GET /");
  res.send("Express + TypeScript Server");
});

app.use("/api", isAuthenticated, router);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
