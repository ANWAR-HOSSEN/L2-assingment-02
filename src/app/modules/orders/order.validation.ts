import { z } from "zod";

export const orderValidationSchema = z.object({
  _id: z.string().optional(),
  email: z.string({ message: "Email is required" }).email(),
  productId: z.string({ message: "Product Id is required" }),
  price: z.number({ message: "Price is required" }).positive(),
  quantity: z.number({ message: "Quantity is required" }).positive(),
});
