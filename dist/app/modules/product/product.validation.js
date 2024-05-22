"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productValidationSchema = exports.inventoryValidationSchema = exports.variantsValidationSchema = void 0;
const zod_1 = require("zod");
exports.variantsValidationSchema = zod_1.z.object({
    type: zod_1.z.string({ required_error: "Product variant must have a type" }),
    value: zod_1.z.string({ required_error: "Product variant must have a value" }),
});
exports.inventoryValidationSchema = zod_1.z.object({
    quantity: zod_1.z
        .number()
        .positive({ message: "Quantity must be a positive number" }),
    inStock: zod_1.z.boolean({ required_error: "InStock must be specified" }),
});
exports.productValidationSchema = zod_1.z.object({
    _id: zod_1.z.string().optional(),
    name: zod_1.z.string({ required_error: "Product name must be provided" }),
    description: zod_1.z.string({
        required_error: "Product description must be provided",
    }),
    price: zod_1.z
        .number({ invalid_type_error: "Price must be a number" })
        .positive({ message: "Price must be greater than 0" }),
    category: zod_1.z.string({ required_error: "Product must have a category" }),
    tags: zod_1.z
        .string()
        .array()
        .min(1, { message: "At least one tag is required for each product" }),
    variants: exports.variantsValidationSchema
        .array()
        .nonempty({ message: "At least one variant is required" }),
    inventory: exports.inventoryValidationSchema.required(),
});
