import { gql } from "apollo-server-express";

export const typeDefsArticle = gql`
  type Article {
    id: ID
    title: String
    avatar: String
    description: String
    category: Category
  }
  # tất cả các phần lấy ra dữ liệu thì viết ở phần Query
  type Query {
    getListArticles(
      sortKey: String
      sortValue: String
      currentPage: Int = 1
      limitItem: Int = 2
      filterKey: String
      filterValue: String
      keyword: String
    ): [Article]
    getArticle(id: ID): Article
  }

  input ArticleInput {
    title: String
    avatar: String
    description: String
    categoryId: String
  }

  # tất cả phần thay đổi dữ liệu thì viết ở phần Mutation
  type Mutation {
    createArticle(article: ArticleInput): Article
    deleteArticle(id: ID): String
    updateArticle(id: ID, article: ArticleInput): Article
  }
`;
