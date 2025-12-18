import dotenv from "dotenv";
dotenv.config();

import express from "express";
import Order from "../Model/orderSchema.js";
import jwt from "jsonwebtoken";
import { createPayPalOrder, capturePayPalOrder } from "../Utils/paypal.js";

const getUserIdFromToken = (req) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader) throw new Error("No token provided");

  const token = authHeader.split(" ")[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  return decoded.userId;
};

// ======= Standard Order Creation (COD) =======
export const createOrder = async (req, res) => {
  try {
    const userId = getUserIdFromToken(req);
    const {
      products,
      name,
      email,
      phone,
      address,
      city,
      state,
      pincode,
      paymentMethod,
      totalAmount,
      paypalTransactionId
    } = req.body;

    if (!products || products.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const newOrder = new Order({
      userId,
      products,
      name,
      email,
      phone,
      address,
      city,
      state,
      pincode,
      paymentMethod,
      paymentStatus: paymentMethod === "cod" ? "pending" : "paid",
      totalAmount,
      paypalTransactionId
    });

    await newOrder.save();

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order: newOrder,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// ======= Get all orders (admin) =======
export const getOrder = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// ======= Get logged-in user's orders =======
export const userOrder = async (req, res) => {
  try {
    const userId = getUserIdFromToken(req);
    const orders = await Order.find({ userId }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======= Update Order Status (Admin) =======
export const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const orders = await Order.findByIdAndUpdate(
      id,
      { $set: { status: status.toLowerCase() } },
      { new: true }
    );
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ======= Create PayPal Order (returns ID to frontend) =======
// export const createPayPalOrderController = async (req, res) => {
//   try {
//     const { totalAmount } = req.body;

//     if (!totalAmount) {
//       return res.status(400).json({ message: "Amount required" });
//     }

//     const paypalOrder = await createPayPalOrder(totalAmount);

//     res.status(200).json({
//       success: true,
//       id: paypalOrder.id,
//     });
//   } catch (error) {
//     console.error("PayPal Create Error:", error.message);
//     res.status(500).json({ message: "PayPal order creation failed" });
//   }
// };


// ======= Create PayPal Order (returns ID to frontend) =======
export const createPayPalOrderController = async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount) {
      return res.status(400).json({ message: "Amount is required" });
    }

    const paypalOrder = await createPayPalOrder(Number(amount));

    // 🔥 MUST return ONLY the PayPal order ID
    res.status(200).json({
      id: paypalOrder.id,
    });
  } catch (error) {
  console.error("🔥 PAYPAL CREATE ERROR FULL:", error);
  res.status(500).json({
    message: error.message,
    stack: error.stack
  });
}

};

// ======= Verify PayPal Payment & Create Order =======
export const verifyPayPalAndCreateOrder = async (req, res) => {
  try {
    const userId = getUserIdFromToken(req);

    const {
      paypalOrderId,
      products,
      name,
      email,
      phone,
      address,
      city,
      state,
      pincode,
      totalAmount,
    } = req.body;

    // console.log("🔥 VERIFY HIT:", paypalOrderId);

    if (!paypalOrderId) {
      return res.status(400).json({ message: "PayPal order ID missing" });
    }

    // 🔐 Capture payment
    const payment = await capturePayPalOrder(paypalOrderId);

    if (payment.status !== "COMPLETED") {
      return res.status(400).json({ message: "Payment not completed" });
    }

    const transactionId =
      payment.purchase_units[0].payments.captures[0].id;

    // ✅ Save order
    const newOrder = new Order({
      userId,
      products,
      name,
      email,
      phone,
      address,
      city,
      state,
      pincode,
      paymentMethod: "paypal",
      paymentStatus: "paid",
      paypalOrderId,
      paypalTransactionId: transactionId,
      totalAmount,
      status: "confirmed",
    });

    await newOrder.save();

    // ✅ SINGLE RESPONSE (IMPORTANT)
    return res.status(200).json({
      success: true,
      orderId: newOrder._id,
    });

  } catch (error) {
    // console.error("Verify PayPal Error:", error);
    return res.status(500).json({ message: "Payment verification failed" });
  }
};

