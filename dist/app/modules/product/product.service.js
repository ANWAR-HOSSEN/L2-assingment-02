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

const createProductInDatabase = (productData) => __awaiter(void 0, void 0, void 0, function* () {
    
    const result = yield product_model_1.Product.create(productData);
    return result;
});

const getAllProductsFromDatabase = (query) => __awaiter(void 0, void 0, void 0, function* () {
  
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

const getSingleProductFromDatabase = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.findById(id);
    return result;
});

const updateAProductInDatabase = (id, productData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.findByIdAndUpdate(id, productData, {
        new: true,
    });
    return result;
});

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
