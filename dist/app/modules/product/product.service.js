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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductServices = void 0;
const product_model_1 = require("./product.model");
// HACK: create product in database services
const createProductInDatabase = (productData) => __awaiter(void 0, void 0, void 0, function* () {
    // INFO: here we are receiving refined data by zod validation safeParse
    const result = yield product_model_1.Product.create(productData);
    return result;
});
// HACK: get all products from database services
const getAllProductsFromDatabase = (query) => __awaiter(void 0, void 0, void 0, function* () {
    //  INFO:: filtering if any query is given or not
    // INFO: regex will be applied in name and description field
    const regexCriteria = query
        ? {
            $or: [
                { name: { $regex: query, $options: "i" } },
                { description: { $regex: query, $options: "i" } },
            ],
        }
        : {};
    const result = yield product_model_1.Product.find(regexCriteria);
    return result;
});
// HACK: get  a single product from database services
const getSingleProductFromDatabase = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.findById(id);
    return result;
});
// HACK: update a product from database services
const updateAProductInDatabase = (id, productData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.findByIdAndUpdate(id, productData, {
        new: true,
    });
    return result;
});
// HACK: delete a product from database services
const deleteAProductFromDatabase = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.findByIdAndDelete(id);
    return result;
});
exports.ProductServices = {
    createProductInDatabase,
    getAllProductsFromDatabase,
    getSingleProductFromDatabase,
    updateAProductInDatabase,
    deleteAProductFromDatabase,
};
