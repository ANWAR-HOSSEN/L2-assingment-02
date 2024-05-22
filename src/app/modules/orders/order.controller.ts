import { Request, Response } from "express";
import { orderValidationSchema } from "./order.validation";
import { OrderServices } from "./order.services";
import { TOrders } from "./order.interface";


const createOrder = async (req: Request, res: Response) => {
  try {
    const parsedData = orderValidationSchema.safeParse(req.body.order);
    

    if (!parsedData.success) {
      const message = JSON.stringify(parsedData.error);
      throw new Error(message);
    }

    const order = await OrderServices.createOrderInDatabase(
      parsedData.data as TOrders,
    );
    res.status(201).json({
      success: true,
      message: "Order make successfully!",
      data: order,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
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

const getAllOrder = async (req: Request, res: Response) => {
  try {

    let query: string = "";
    const { email } = req.query;

    if (email !== undefined) {
      if (typeof email === "string") {
        query = email;
      } else if (Array.isArray(email)) {
        query = email.join(" ");
      }
    }

    const order = await OrderServices.getAllOrderFromDatabase(query);

    if (order.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Order not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Orders fetched successfully!",
      data: order,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Something  wrong ",
      error,
    });
  }
};

export const OrderCollection = {
  createOrder,
  getAllOrder,
};
