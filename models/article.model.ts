import mongoose from "mongoose";

const articleSchema = new mongoose.Schema(
  {
    title: String,
    categoryId: String,
    avatar: String,
    description: String,
    deleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: Date,
  },
  {
    timestamps: true,
  },
);

const Articles = mongoose.model("Articles", articleSchema, "articles");

export default Articles;
