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
exports.OrderServices = void 0;
const order_model_1 = require("./order.model");
// NOTE: service function to create a order in database
const createOrderInDatabase = (ordersData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.Order.create(ordersData);
    return result;
});
// NOTE: service function to get all order from database
const getAllOrderFromDatabase = (query) => __awaiter(void 0, void 0, void 0, function* () {
    // INFO: make the query more dynamic according to the logic
    const resultQuery = query ? { email: query } : {};
    const result = yield order_model_1.Order.find(resultQuery);
    return result;
});
exports.OrderServices = {
    createOrderInDatabase,
    getAllOrderFromDatabase,
};
