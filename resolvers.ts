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
  },
};
