import express, { Request, Response } from "express";
import cors from "cors";
import { ProductRoutes } from "./app/modules/product/product.route";
import { OrderRoutes } from "./app/modules/orders/order.route";

const app = express();

const corsConfig = {
  origin:"*",
  credential:true,
  methods:['GET','POST',"PUT","DELETE"]
}


app.use(express.json());
app.use(cors(corsConfig));

app.use("/api/products", ProductRoutes);
app.use("/api/orders", OrderRoutes);

app.get("/", (req, res) => {
  res.status(200).json({
    success:true,
    message:" express is running"
  })
});

app.all("*", (req: Request, res: Response) => {
  res.status(400).json({
    success: false,
    message: JSON.stringify("Route Not Found"),
  });
});

export default app;
