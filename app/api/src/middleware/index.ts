//import * as bodyParser from "body-parser"; //not needed anymore with the updated version of Express
import compression from "compression";
import express, { Express } from "express";
import helmet from "helmet";
import bodyParser from "body-parser";
import cors from "cors";

const registerMiddleware = (app: Express) => {
  // cors
  app.use(cors());
  // json bodyParser
  app.use(bodyParser.json());

  // helmet
  app.use(helmet.noSniff());
  app.use(helmet.hidePoweredBy());
  app.use(helmet.xssFilter());

  // compression
  app.use(compression());
};

export { registerMiddleware };
