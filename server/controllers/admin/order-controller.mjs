import mongoose from "mongoose";
import Order from "../../models/Order.mjs";

export const getAllOrdersOfAllUser = async (req, res) => {
  try {
    // Fetch orders for the user
    const orders = await Order.find({});

    // Check if orders exist
    if (!orders.length) {
      return res.status(404).json({
        success: false,
        message: "No orders found!",
      });
    }

    // Return the orders
    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({
      success: false,
      message: "Error occurred while fetching orders",
    });
  }
};

export const getOrdersDetailsForAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate the ID
    if (!id || !mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Order ID",
      });
    }

    // Fetch the order from the database
    const order = await Order.findById(id);

    // Check if the order exists
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found!",
      });
    }

    // Return the order details
    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    console.error("Error fetching order details:", error);
    res.status(500).json({
      success: false,
      message: "Error occurred while fetching order details",
    });
  }
};