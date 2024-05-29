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
exports.Order = void 0;
const mongoose_1 = require("mongoose");
const product_model_1 = require("../product/product.model");
const orderSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: [true, "want an email"],
    },
    productId: {
        type: String,
        required: [true, "want a Product id"],
    },
    price: {
        type: Number,
        required: [true, "want Price"],
    },
    quantity: {
        type: Number,
        required: [true, "want quantity"],
    },
});
orderSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const existProduct = yield product_model_1.Product.findById(this.productId);
        if (existProduct === null) {
            const message = JSON.stringify("Order Not Found");
            throw new Error(message);
        }
        const orderQuantity = this.quantity;
        const productid = this.productId;
        const product = yield product_model_1.Product.findOne({ _id: productid }); 
        const checkProductQuantity = (product === null || product === void 0 ? void 0 : product.inventory.quantity) - orderQuantity;
        if (!((product === null || product === void 0 ? void 0 : product.inventory.quantity) >= orderQuantity)) {
            const message = JSON.stringify("quantity unavailable in inventory");
            throw new Error(message);
        }
        if (checkProductQuantity > 0) {
            yield product_model_1.Product.findOneAndUpdate({ _id: productid }, {
                "inventory.quantity": checkProductQuantity,
            }, {
                new: true,
            });
        }
        else {
            yield product_model_1.Product.findOneAndUpdate({ _id: productid }, {
                "inventory.quantity": 0,
                "inventory.inStock": false,
            }, {
                new: true,
            });
        } 
        next();
    });
});
exports.Order = (0, mongoose_1.model)("Order", orderSchema);
