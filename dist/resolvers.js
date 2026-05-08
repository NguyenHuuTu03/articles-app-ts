"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const article_model_1 = __importDefault(require("./models/article.model"));
const category_1 = __importDefault(require("./models/category"));
exports.resolvers = {
    Query: {
        getListArticles: () => __awaiter(void 0, void 0, void 0, function* () {
            const articles = yield article_model_1.default.find({
                deleted: false,
            });
            return articles;
        }),
        getArticle: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { id } = args;
            const article = yield article_model_1.default.findOne({
                _id: id,
                deleted: false,
            });
            return article;
        }),
        getListCategory: () => __awaiter(void 0, void 0, void 0, function* () {
            const categories = yield category_1.default.find({
                deleted: false,
            });
            return categories;
        }),
        getCategory: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { id } = args;
            const category = yield category_1.default.findOne({
                _id: id,
                deleted: false,
            });
            return category;
        }),
    },
    Article: {
        category: (article) => __awaiter(void 0, void 0, void 0, function* () {
            const categoryId = article.categoryId;
            const category = yield category_1.default.findOne({
                _id: categoryId,
            });
            return category;
        }),
    },
    Mutation: {
        createArticle: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { article } = args;
            const record = new article_model_1.default(article);
            yield record.save();
            return record;
        }),
        deleteArticle: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { id } = args;
            yield article_model_1.default.updateOne({
                _id: id,
            }, {
                deleted: true,
                deletedAt: Date.now(),
            });
            return "Đã xoá";
        }),
        updateArticle: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { id, article } = args;
            yield article_model_1.default.updateOne({
                _id: id,
            }, article);
            const record = yield article_model_1.default.findOne({
                _id: id,
            });
            return record;
        }),
        createCategory: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { category } = args;
            const record = new category_1.default(category);
            yield record.save();
            return record;
        }),
        deleteCategory: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { id } = args;
            yield category_1.default.updateOne({
                _id: id,
            }, {
                deleted: true,
                deletedAt: Date.now(),
            });
            return "Đã xoá";
        }),
        updateCategory: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { id, category } = args;
            yield category_1.default.updateOne({
                _id: id,
            }, category);
            const record = yield category_1.default.findOne({
                _id: id,
            });
            return record;
        }),
    },
};
