import { ConnectionOptions, createConnection, getConnectionOptions, getManager } from "typeorm";
import express from "express";
import * as bodyParser from "body-parser";
import cors from "cors";
import { Request, Response } from "express";
import { Routes } from "./routes";
import api from './routes/allRoutes'
import cookieParser from "cookie-parser"
import { User } from "./entity/User";
import { Favorite } from "./entity/Favorite";
import { Article } from "./entity/Article";
import path from "path";
import dotenv from 'dotenv'
dotenv.config()

const main = async () => {
  try {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"
    const app = express();
    //middleware
    app.use(bodyParser.json());
    app.use(cookieParser())
    app.use(express.json());
    app.use(cors())

    app.use(express.static(path.join(__dirname, '../client', 'build')))
   
    app.get('*', async(Request, Response) => {
      Response.sendFile(path.join(__dirname, '../client', 'build', 'index.html'))
    })
 

    const getOptions = async () => {
      let connectionOptions: ConnectionOptions;
      connectionOptions = {
        type: 'postgres',
        synchronize: false,
        logging: false,
        extra: {
          ssl: true,
          rejectUnauthorized: false
        },
        entities: [User, Favorite, Article],
      };

      if (process.env.DATABASE_URL) {
        Object.assign(connectionOptions, { url: process.env.DATABASE_URL });
      } 
    
      return connectionOptions;
    };
    const connect2Database = async (): Promise<void> => {
      const typeormconfig = await getOptions();
      await createConnection(typeormconfig);
  };
  
  connect2Database().then(async () => {
      console.log('Connected to database');
  });

   

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use('/api', api)
 
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
