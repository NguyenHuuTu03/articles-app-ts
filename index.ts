import express from "express";
import dotenv from "dotenv";
dotenv.config();
import * as databaseConfig from "./config/database";
databaseConfig.connectDB();
import { ApolloServer, gql } from "apollo-server-express";
import { typeDefs } from "./typeDefs/index.typeDefs";
import { resolvers } from "./resolvers/index.resolvers";
import { requireAuth } from "./middleware/auth.middleware";

const startServer = async () => {
  const app = express();
  const port: string | number = process.env.PORT || 3000;

  // GraphQL
  app.use("/graphql", requireAuth);
  // typeDefs để định nghĩa các trường được truy vấn (như model)

  const appolloServer = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers,
    introspection: true, // gợi ý code trong graphql
    context: ({ req }) => {
      return { ...req };
    },
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
