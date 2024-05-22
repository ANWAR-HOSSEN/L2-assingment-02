"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderValidationSchema = void 0;
const zod_1 = require("zod");
exports.orderValidationSchema = zod_1.z.object({
    _id: zod_1.z.string().optional(),
    email: zod_1.z.string({ message: "Email is required" }).email(),
    productId: zod_1.z.string({ message: "Product Id is required" }),
    price: zod_1.z.number({ message: "Price is required" }).positive(),
    quantity: zod_1.z.number({ message: "Quantity is required" }).positive(),
});
