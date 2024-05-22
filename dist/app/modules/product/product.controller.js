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
exports.ProductController = void 0;
const product_service_1 = require("./product.service");
const product_validation_1 = require("./product.validation");
// HACK: product controller to create product
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body.product;
        const parsedData = product_validation_1.productValidationSchema.safeParse(data);
        // INFO: if zod validation safeParse gives me false then i will throw an error
        if (!parsedData.success) {
            const message = JSON.stringify(parsedData.error);
            throw new Error(message);
        }
        const product = yield product_service_1.ProductServices.createProductInDatabase(parsedData.data);
        res.status(201).json({
            success: true,
            message: "Product Created Successfully!",
            data: product,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: "Something Went Wrong To Create Product",
            error: error instanceof Error
                ? (() => {
                    try {
                        return JSON.parse(error.message);
                    }
                    catch (e) {
                        return { message: error.message };
                    }
                })()
                : error,
        });
    }
});
// HACK: get all products controller
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { searchTerm } = req.query;
        let query = "";
        // INFO: if query is given then the query will be taken and if not then query = ''
        if (searchTerm !== undefined) {
            if (typeof searchTerm === "string") {
                query = searchTerm;
            }
            else if (Array.isArray(searchTerm)) {
                query = searchTerm.join(" ");
            }
        }
        const product = yield product_service_1.ProductServices.getAllProductsFromDatabase(query);
        // NOTE: checking whether product is in database or not
        if (product.length === 0) {
            return res.status(400).json({
                success: false,
                message: "No Product Found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Products Fetched Successfully!",
            data: product,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: "Something Went Wrong To Fetch The Data",
            error,
        });
    }
});
// HACK: product controller to get a single data
const getSingleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const product = yield product_service_1.ProductServices.getSingleProductFromDatabase(productId);
        if (!product) {
            return res.status(400).json({
                success: false,
                message: "No Product Found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Product Fetched Successfully!",
            data: product,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: "Something Went Wrong To Fetch The Data",
            error,
        });
    }
});
// HACK: product controller to update the Data
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const data = req.body;
        // NOTE: checking if any data is given or not .. if not then send a Response with that there is nothing to update
        if (Object.keys(data).length === 0) {
            return res.status(400).json({
                success: false,
                message: "There is nothing to update as you did not give any data",
            });
        }
        // INFO: if any data is given then checking validation by using zod and used partial
        const parsedData = product_validation_1.productValidationSchema.partial().safeParse(data);
        console.log(parsedData);
        // INFO: if zod validation parsedData.success is false then it will throw error
        if (!parsedData.success) {
            const message = JSON.stringify(parsedData.error);
            throw new Error(message);
        }
        // INFO: suppose if anyone given random field data which is not in the model then i will show this error
        if (Object.keys(parsedData.data).length === 0) {
            const message = JSON.stringify("Please provide the data according to the field");
            throw new Error(message);
        }
        const product = yield product_service_1.ProductServices.updateAProductInDatabase(productId, parsedData.data);
        res.status(200).json({
            success: true,
            message: "Product Updated Successfully!",
            data: product,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: "Something went wrong to update the data",
            error: error instanceof Error
                ? (() => {
                    try {
                        return JSON.parse(error.message);
                    }
                    catch (e) {
                        return { message: error.message };
                    }
                })()
                : error,
        });
    }
});
// HACK: product controller to delete a data
const deleteAProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield product_service_1.ProductServices.deleteAProductFromDatabase(req.params.productId);
        if (!product) {
            return res.status(400).json({
                success: false,
                message: "Sorry There Is No Such Product To Delete",
            });
        }
        res.status(200).json({
            success: true,
            message: "Product Deleted Successfully!",
            data: null,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: "Something Went Wrong To Delete The Data",
            error,
        });
    }
});
exports.ProductController = {
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteAProduct,
};
