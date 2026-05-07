import Articles from "../models/article.model";
import Categories from "../models/category";

export const resolversArticle = {
  Query: {
    getListArticles: async (_: unknown, args: any) => {
      // sort
      const { sortKey, sortValue } = args;
      const sort: any = {};
      if (sortKey && sortValue) {
        sort[sortKey] = sortValue;
      }
      // End sort
      const articles = await Articles.find({
        deleted: false,
      }).sort(sort);
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
  },
};
