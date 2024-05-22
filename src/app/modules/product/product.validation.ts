import { z } from "zod";

export const variantsValidationSchema = z.object({
  type: z.string({ required_error: "Product variant must have a type" }),
  value: z.string({ required_error: "Product variant must have a value" }),
});

export const inventoryValidationSchema = z.object({
  quantity: z
    .number()
    .positive({ message: "Quantity must be a positive number" }),
  inStock: z.boolean({ required_error: "InStock must be specified" }),
});

export const productValidationSchema = z.object({
  _id: z.string().optional(),
  name: z.string({ required_error: "Product name must be provided" }),
  description: z.string({
    required_error: "Product description must be provided",
  }),
  price: z
    .number({ invalid_type_error: "Price must be a number" })
    .positive({ message: "Price must be greater than 0" }),
  category: z.string({ required_error: "Product must have a category" }),
  tags: z
    .string()
    .array()
    .min(1, { message: "At least one tag is required for each product" }),
  variants: variantsValidationSchema
    .array()
    .nonempty({ message: "At least one variant is required" }),
  inventory: inventoryValidationSchema.required(),
});
