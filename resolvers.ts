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
};
