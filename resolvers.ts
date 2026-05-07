import Articles from "./models/article.model";
import Categories from "./models/category";

export const resolvers = {
  Query: {
    getListArticles: async () => {
      const articles = await Articles.find({
        deleted: false,
      });
      return articles;
    },
    getArticle: async (_: unknown, args: any) => {
      const { id } = args;
      const article = await Articles.findOne({
        _id: id,
        deleted: false,
      });
      return article;
    },
    // category
    getListCategory: async () => {
      const categories = await Categories.find({
        deleted: false,
      });
      return categories;
    },
    getCategory: async (_: unknown, args: any) => {
      const { id } = args;
      const category = await Categories.findOne({
        _id: id,
        deleted: false,
      });
      return category;
    },
  },
  Article: {
    category: async (article: any) => {
      const categoryId = article.categoryId;
      const category = await Categories.findOne({
        _id: categoryId,
      });
      return category;
    },
  },
  Mutation: {
    createArticle: async (_: unknown, args: any) => {
      const { article } = args;
      const record = new Articles(article);
      await record.save();
      return record;
    },
    deleteArticle: async (_: unknown, args: any) => {
      const { id } = args;
      await Articles.updateOne(
        {
          _id: id,
        },
        {
          deleted: true,
          deletedAt: Date.now(),
        },
      );
      return "Đã xoá";
    },
    updateArticle: async (_: unknown, args: any) => {
      const { id, article } = args;
      await Articles.updateOne(
        {
          _id: id,
        },
        article,
      );
      const record = await Articles.findOne({
        _id: id,
      });
      return record;
    },
    // category
    createCategory: async (_: unknown, args: any) => {
      const { category } = args;
      const record = new Categories(category);
      await record.save();
      return record;
    },
    deleteCategory: async (_: unknown, args: any) => {
      const { id } = args;
      await Categories.updateOne(
        {
          _id: id,
        },
        {
          deleted: true,
          deletedAt: Date.now(),
        },
      );
      return "Đã xoá";
    },
    updateCategory: async (_: unknown, args: any) => {
      const { id, category } = args;
      await Categories.updateOne(
        {
          _id: id,
        },
        category,
      );
      const record = await Categories.findOne({
        _id: id,
      });
      return record;
    },
  },
};
