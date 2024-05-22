import e from "express";
import { OrderCollection } from "./order.controller";

const router = e.Router();

router
  .route("/")
  .post(OrderCollection.createOrder)
  .get(OrderCollection.getAllOrder);
export const OrderRoutes = router;
