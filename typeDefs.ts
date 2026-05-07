import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Article {
    id: ID
    title: String
    avatar: String
    description: String
  }
  # tất cả các phần lấy ra dữ liệu thì viết ở phần Query
  type Query {
    hello: String
    getListArticles: [Article]
    getArticle(id: ID): Article
  }

  input ArticleInput {
    title: String
    avatar: String
    description: String
  }
  # tất cả phần thay đổi dữ liệu thì viết ở phần Mutation
  type Mutation {
    createArticle(article: ArticleInput): Article
    deleteArticle(id: ID): String
  }
`;
