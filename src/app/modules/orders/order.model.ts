import { Schema, model } from "mongoose";
import { TOrders } from "./order.interface";
import { Product } from "../product/product.model";

const orderSchema = new Schema<TOrders>({
  email: {
    type: String,
    required: [true, "want an email "],
  },
  productId: {
    type: String,
    required: [true, " want a Product id "],
  },
  price: {
    type: Number,
    required: [true, " want Price"],
  },
  quantity: {
    type: Number,
    required: [true, " want quantity "],
  },
});



orderSchema.pre("save", async function (next) {
  const existProduct = await Product.findById(this.productId);
  

  if (existProduct === null) {
    const message = JSON.stringify("Order Not Found");
    throw new Error(message);
  }

  const orderQuantity = this.quantity;
  const productid = this.productId;
  const product = await Product.findOne({ _id: productid }); 

  const checkProductQuantity =
    (product?.inventory.quantity as number) - orderQuantity;

 
  if (!((product?.inventory.quantity as number) >= orderQuantity)) {
    const message = JSON.stringify(
      " quantity unavailable in inventory",
    );
    throw new Error(message);
  }

  if (checkProductQuantity > 0) {
    
    await Product.findOneAndUpdate(
      { _id: productid },
      {
        "inventory.quantity": checkProductQuantity,
      },
      {
        new: true,
      },
    );
  } else {
    
    await Product.findOneAndUpdate(
      { _id: productid },
      {
        "inventory.quantity": 0,
        "inventory.inStock": false,
      },
      {
        new: true,
      },
    );
  } 
  next();
});

export const Order = model<TOrders>("Order", orderSchema);
