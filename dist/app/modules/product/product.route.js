"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRoutes = void 0;
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("./product.controller");
const router = express_1.default.Router();
router
    .route("/")
    .post(product_controller_1.ProductController.createProduct)
    .get(product_controller_1.ProductController.getAllProducts);
router
    .route("/:productId")
    .get(product_controller_1.ProductController.getSingleProduct)
    .put(product_controller_1.ProductController.updateProduct)
    .delete(product_controller_1.ProductController.deleteAProduct);
exports.ProductRoutes = router;
