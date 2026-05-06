import express from "express";
import dotenv from "dotenv";
dotenv.config();
import * as databaseConfig from "./config/database";
databaseConfig.connectDB();
import Articles from "./models/article.model";
import { ApolloServer, gql } from "apollo-server-express";
import { typeDefs } from "./typeDefs";
import { resolvers } from "./resolvers";

const startServer = async () => {
  const app = express();
  const port: string | number = process.env.PORT || 3000;

  // GraphQL
  // typeDefs để định nghĩa các trường được truy vấn (như model)

  const appolloServer = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await appolloServer.start();

  appolloServer.applyMiddleware({
    app: app as any,
    path: "/graphql",
  });

  app.listen(port, () => {
    console.log(`Hãy truy cập vào link: http://localhost:${port}/graphql`);
  });
};
startServer();
