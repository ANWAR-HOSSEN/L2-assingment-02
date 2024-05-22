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
        required: [true, "An email is needed for order"],
    },
    productId: {
        type: String,
        required: [true, "Product id is needed"],
    },
    price: {
        type: Number,
        required: [true, "Price is needed"],
    },
    quantity: {
        type: Number,
        required: [true, "quantity is needed"],
    },
});
// INFO: mongoose pre hooks for some extra query
orderSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const existProduct = yield product_model_1.Product.findById(this.productId);
        // NOTE: check if product is available or not
        if (existProduct === null) {
            const message = JSON.stringify("Order Not Found");
            throw new Error(message);
        }
        const orderQuantity = this.quantity;
        const productid = this.productId;
        const product = yield product_model_1.Product.findOne({ _id: productid }); // INFO: get the product from product collection
        const checkProductQuantity = (product === null || product === void 0 ? void 0 : product.inventory.quantity) - orderQuantity;
        // INFO: if orderQuantity is greater than the  product quantity then it will throw an error
        if (!((product === null || product === void 0 ? void 0 : product.inventory.quantity) >= orderQuantity)) {
            const message = JSON.stringify("Insufficient quantity available in inventory");
            throw new Error(message);
        }
        if (checkProductQuantity > 0) {
            // NOTE: if product quantity > 0 then order will be place and quantity will be subtracted from order quantity
            yield product_model_1.Product.findOneAndUpdate({ _id: productid }, {
                "inventory.quantity": checkProductQuantity,
            }, {
                new: true,
            });
        }
        else {
            // NOTE: if prdcut quantity < 0 then order will not be placed quantity will be 0 and inStock will be false
            yield product_model_1.Product.findOneAndUpdate({ _id: productid }, {
                "inventory.quantity": 0,
                "inventory.inStock": false,
            }, {
                new: true,
            });
        } // NOTE: if everything is okay then go to the next();
        next();
    });
});
exports.Order = (0, mongoose_1.model)("Order", orderSchema);
