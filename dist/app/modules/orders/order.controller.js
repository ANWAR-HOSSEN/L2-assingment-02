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
exports.OrderCollection = void 0;
const order_validation_1 = require("./order.validation");
const order_services_1 = require("./order.services");
// NOTE: controller function to create a order
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parsedData = order_validation_1.orderValidationSchema.safeParse(req.body.order);
        // INFO: if zod validation safeParse gives me false then it will throw an error
        if (!parsedData.success) {
            const message = JSON.stringify(parsedData.error);
            throw new Error(message);
        }
        const order = yield order_services_1.OrderServices.createOrderInDatabase(parsedData.data);
        res.status(201).json({
            success: true,
            message: "Order created successfully!",
            data: order,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error instanceof Error
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
// NOTE: controller function to show all order
const getAllOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // INFO: if query is given then query will be taken and not given then empty string will be the query
        let query = "";
        const { email } = req.query;
        // INFO: checking whether email is undefined or not
        if (email !== undefined) {
            if (typeof email === "string") {
                query = email;
            }
            else if (Array.isArray(email)) {
                query = email.join(" ");
            }
        }
        const order = yield order_services_1.OrderServices.getAllOrderFromDatabase(query);
        // INFO: if there is no order then 'Orders not found' wii be shown
        if (order.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Order not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Orders fetched successfully!",
            data: order,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: "Something went wrong ",
            error,
        });
    }
});
exports.OrderCollection = {
    createOrder,
    getAllOrder,
};
