import { registerRoutes } from "./routes";
import express, { Express } from "express";
import { registerMiddleware } from "./middleware";

const app: Express = express();

// app.get("/", (req, res) => {
//   res.json({ message: "Hello World!!!!" });
// });

// register middlewate
registerMiddleware(app);
// register routes
registerRoutes(app);

export default app;
