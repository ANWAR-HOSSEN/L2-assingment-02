import { Request, Response } from "express";
import { ProductServices } from "./product.service";
import { productValidationSchema } from "./product.validation";
import { TProduct } from "./product.interface";

const createProduct = async (req: Request, res: Response) => {
  try {
    const data = req.body.product;
    const parsedData = productValidationSchema.safeParse(data);
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


const getAllProducts = async (req: Request, res: Response) => {
  try {
    const { searchTerm } = req.query;
    let query: string = "";
    if (searchTerm !== undefined) {
      if (typeof searchTerm === "string") {
        query = searchTerm;
      } else if (Array.isArray(searchTerm)) {
        query = searchTerm.join(" ");
      }
    }

    const product = await ProductServices.getAllProductsFromDatabase(query);
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

const updateProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const data = req.body;

    if (Object.keys(data).length === 0) {
      return res.status(400).json({
        success: false,
        message: "There is nothing to update as you did not give any data",
      });
    }


    const parsedData = productValidationSchema.partial().safeParse(data);
  console.log(parsedData);
    if (!parsedData.success) {
      const message = JSON.stringify(parsedData.error);
      throw new Error(message);
    }
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
