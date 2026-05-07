import Articles from "./models/article.model";

export const resolvers = {
  Query: {
    hello: () => {
      return "Hello word!";
    },
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
