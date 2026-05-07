import { gql } from "apollo-server-express";

export const typeDefsCategory = gql`
  type Category {
    id: ID
    title: String
    avatar: String
  }
  # tất cả các phần lấy ra dữ liệu thì viết ở phần Query
  type Query {
    getListCategory: [Category]
    getCategory(id: ID): Category
  }

  input CategoryInput {
    title: String
    avatar: String
  }
  # tất cả phần thay đổi dữ liệu thì viết ở phần Mutation
  type Mutation {
    createCategory(category: CategoryInput): Category
    deleteCategory(id: ID): String
    updateCategory(id: ID, category: CategoryInput): Category
  }
`;
