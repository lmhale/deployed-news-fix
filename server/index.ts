import { createConnection, getConnectionOptions, getManager } from "typeorm";
import express from "express";
import * as bodyParser from "body-parser";
import cors from "cors";
import { Request, Response } from "express";
import { Routes } from "./routes";
import allRoutes from './routes/allRoutes'
import cookieParser from "cookie-parser"
import { User } from "./entity/User";
import { Favorite } from "./entity/Favorite";
import { Article } from "./entity/Article";
import path from "path";


const main = async () => {
  try {
    const app = express();
    //middleware
    app.use(bodyParser.json());
    app.use(cookieParser())
    app.use(express.json());
    app.use(cors())
    app.use(express.static(path.join(__dirname, 'build')));
    const connectionOptions = await getConnectionOptions();
    await createConnection({
      ...connectionOptions,
      entities: [User, Favorite, Article],
    });
    console.log("successfully connected to DB");
    app.use(express.static('build'));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use('/', allRoutes)
 
    const port = process.env.PORT || 5000
    app.listen(port, () => {
      console.log(`Now running on port ${port} `);
    });
  } catch (error) {
    console.error(error);
    throw new Error("unable to connect to database");
  }
};
main();
