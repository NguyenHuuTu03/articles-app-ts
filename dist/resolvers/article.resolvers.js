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
exports.resolversArticle = void 0;
const article_model_1 = __importDefault(require("../models/article.model"));
const category_1 = __importDefault(require("../models/category"));
exports.resolversArticle = {
    Query: {
        getListArticles: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { sortKey, sortValue, currentPage, limitItem, filterKey, filterValue, keyword, } = args;
            const find = {
                deleted: false,
            };
            const sort = {};
            if (sortKey && sortValue) {
                sort[sortKey] = sortValue;
            }
            let skip = 0;
            if (currentPage && limitItem) {
                skip = (currentPage - 1) * limitItem;
            }
            if (filterKey && filterValue) {
                find[filterKey] = filterValue;
            }
            if (keyword) {
                const regex = new RegExp(keyword, "i");
                find["title"] = regex;
            }
            const articles = yield article_model_1.default.find(find)
                .sort(sort)
                .limit(limitItem)
                .skip(skip);
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
    },
};
