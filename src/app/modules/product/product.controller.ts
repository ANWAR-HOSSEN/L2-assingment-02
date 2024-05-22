import { Request, Response } from "express";
import { ProductServices } from "./product.service";
import { productValidationSchema } from "./product.validation";
import { TProduct } from "./product.interface";

// HACK: product controller to create product
const createProduct = async (req: Request, res: Response) => {
  try {
    const data = req.body.product;
    const parsedData = productValidationSchema.safeParse(data);
    // INFO: if zod validation safeParse gives me false then i will throw an error
    if (!parsedData.success) {
      const message = JSON.stringify(parsedData.error);
      throw new Error(message);
    }
    const product = await ProductServices.createProductInDatabase(
      parsedData.data as TProduct,
    );
    res.status(201).json({
      success: true,
      message: "Product Created Successfully!",
      data: product,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Something Went Wrong To Create Product",
      error:
        error instanceof Error
          ? (() => {
              try {
                return JSON.parse(error.message);
              } catch (e) {
                return { message: error.message };
              }
            })()
          : error,
    });
  }
};

// HACK: get all products controller

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const { searchTerm } = req.query;
    let query: string = "";
    // INFO: if query is given then the query will be taken and if not then query = ''
    if (searchTerm !== undefined) {
      if (typeof searchTerm === "string") {
        query = searchTerm;
      } else if (Array.isArray(searchTerm)) {
        query = searchTerm.join(" ");
      }
    }

    const product = await ProductServices.getAllProductsFromDatabase(query);
    // NOTE: checking whether product is in database or not
    if (product.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No Product Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Products Fetched Successfully!",
      data: product,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Something Went Wrong To Fetch The Data",
      error,
    });
  }
};

// HACK: product controller to get a single data
const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const product =
      await ProductServices.getSingleProductFromDatabase(productId);

    if (!product) {
      return res.status(400).json({
        success: false,
        message: "No Product Found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Product Fetched Successfully!",
      data: product,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Something Went Wrong To Fetch The Data",
      error,
    });
  }
};
// HACK: product controller to update the Data

const updateProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const data = req.body;

    // NOTE: checking if any data is given or not .. if not then send a Response with that there is nothing to update
    if (Object.keys(data).length === 0) {
      return res.status(400).json({
        success: false,
        message: "There is nothing to update as you did not give any data",
      });
    }


    // INFO: if any data is given then checking validation by using zod and used partial
    const parsedData = productValidationSchema.partial().safeParse(data);
  console.log(parsedData);
    // INFO: if zod validation parsedData.success is false then it will throw error
    if (!parsedData.success) {
      const message = JSON.stringify(parsedData.error);
      throw new Error(message);
    }
    // INFO: suppose if anyone given random field data which is not in the model then i will show this error
    if (Object.keys(parsedData.data).length === 0) {
      const message = JSON.stringify(
        "Please provide the data according to the field",
      );
      throw new Error(message);
    }

    const product = await ProductServices.updateAProductInDatabase(
      productId,
      parsedData.data as TProduct,
    );
    res.status(200).json({
      success: true,
      message: "Product Updated Successfully!",
      data: product,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Something went wrong to update the data",
      error:
        error instanceof Error
          ? (() => {
              try {
                return JSON.parse(error.message);
              } catch (e) {
                return { message: error.message };
              }
            })()
          : error,
    });
  }
};

const deleteAProduct = async (req: Request, res: Response) => {
  try {
    const product = await ProductServices.deleteAProductFromDatabase(
      req.params.productId,
    );

    if (!product) {
      return res.status(400).json({
        success: false,
        message: "unavilanle Product To Delete",
      });
    }
    res.status(200).json({
      success: true,
      message: "Product Deleted Successfully!",
      data: null,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Something Went Wrong To Delete The Data",
      error,
    });
  }
};

export const ProductController = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteAProduct,
};
