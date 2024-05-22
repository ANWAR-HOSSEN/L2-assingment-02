"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = require("mongoose");
const variantSchema = new mongoose_1.Schema({
    type: {
        type: String,
        required: [true, "A product variant must have a type"],
    },
    value: {
        type: String,
        required: [true, "A product variant must have a value"],
    },
});
const inventorySchema = new mongoose_1.Schema({
    quantity: {
        type: Number,
        required: [true, "A product must have a quantity"],
        min: [0, "Quantity must be a positive number"],
    },
    inStock: {
        type: Boolean,
        required: [true, "Please specify if the product is available or not"],
    },
});
const productSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "A product must have a name"],
    },
    description: {
        type: String,
        required: [true, "A product must have a description"],
    },
    price: {
        type: Number,
        required: [true, "A product must have a price"],
        min: [0, "Price must be greater than 0"],
    },
    category: {
        type: String,
        required: [true, "A product must have a category"],
    },
    tags: {
        type: [String],
        required: [true, "A product must have at least one tag"],
    },
    variants: {
        type: [variantSchema],
        required: [true, "A product must have at least one variant"],
    },
    inventory: {
        type: inventorySchema,
        required: [true, "Inventory details must be provided"],
    },
});
exports.Product = (0, mongoose_1.model)("Product", productSchema);
