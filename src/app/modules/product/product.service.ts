import { TProduct } from "./product.interface";
import { Product } from "./product.model";


const createProductInDatabase = async (productData: TProduct) => {
  
  const result = await Product.create(productData);
  return result;
};


const getAllProductsFromDatabase = async (query: string) => {
 
  const regexCriteria = query
    ? {
        $or: [
          { name: { $regex: query, $options: "i" } },
          { description: { $regex: query, $options: "i" } },
        ],
      }
    : {};
  const result = await Product.find(regexCriteria);

  return result;
};



const getSingleProductFromDatabase = async (id: string) => {
  const result = await Product.findById(id);
  return result;
};


const updateAProductInDatabase = async (id: string, productData: TProduct) => {
  const result = await Product.findByIdAndUpdate(id, productData, {
    new: true,
  });
  return result;
};



const deleteAProductFromDatabase = async (id: string) => {
  const result = await Product.findByIdAndDelete(id);
  return result;
};

export const ProductServices = {
  createProductInDatabase,
  getAllProductsFromDatabase,
  getSingleProductFromDatabase,
  updateAProductInDatabase,
  deleteAProductFromDatabase,
};
