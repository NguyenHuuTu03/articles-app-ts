import Articles from "../models/article.model";
import Categories from "../models/category";

export const resolversCategory = {
  Query: {
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
  Mutation: {
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
