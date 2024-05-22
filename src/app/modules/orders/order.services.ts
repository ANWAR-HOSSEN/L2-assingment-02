import { TOrders } from "./order.interface";
import { Order } from "./order.model";


const createOrderInDatabase = async (ordersData: TOrders) => {
  const result = await Order.create(ordersData);
  return result;
};


const getAllOrderFromDatabase = async (query: string) => {

  const resultQuery = query ? { email: query } : {};

  const result = await Order.find(resultQuery);
  return result;
};

export const OrderServices = {
  createOrderInDatabase,
  getAllOrderFromDatabase,
};
