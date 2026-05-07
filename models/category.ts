import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    title: String,
    avatar: String,
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

const Categories = mongoose.model("Categories", categorySchema, "categories");

export default Categories;
