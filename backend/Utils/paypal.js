// // Utils/paypal.js
// import fetch from "node-fetch"; // If using Node 18+, you can use global fetch
// import dotenv from "dotenv";
// dotenv.config();

// const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
// const PAYPAL_SECRET = process.env.PAYPAL_SECRET;
// const PAYPAL_API = process.env.NODE_ENV === "production"
//   ? "https://api-m.paypal.com"
//   : "https://api-m.sandbox.paypal.com";

// // ======= Get Access Token =======
// async function generateAccessToken() {
//   const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`).toString("base64");

//   const response = await fetch(`${PAYPAL_API}/v1/oauth2/token`, {
//     method: "POST",
//     headers: {
//       Authorization: `Basic ${auth}`,
//       "Content-Type": "application/x-www-form-urlencoded",
//     },
//     body: "grant_type=client_credentials",
//   });

//   const data = await response.json();
//   return data.access_token;
// }

// // ======= Create PayPal Order =======
// export async function createPayPalOrder(totalAmount) {
//   const accessToken = await generateAccessToken();

//   const response = await fetch(`${PAYPAL_API}/v2/checkout/orders`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${accessToken}`,
//     },
//     body: JSON.stringify({
//       intent: "CAPTURE",
//       purchase_units: [
//         {
//           amount: {
//             currency_code: "USD",
//             value: totalAmount.toFixed(2),
//           },
//         },
//       ],
//     }),
//   });

//   if (!response.ok) {
//     const err = await response.text();
//     throw new Error("PayPal Create Order Failed: " + err);
//   }

//   const order = await response.json();
//   return order; // Contains order.id and status
// }

// // ======= Verify PayPal Payment =======
// export async function verifyPayPalPayment(orderId) {
//   const accessToken = await generateAccessToken();

//   const response = await fetch(`${PAYPAL_API}/v2/checkout/orders/${orderId}`, {
//     method: "GET",
//     headers: {
//       Authorization: `Bearer ${accessToken}`,
//       "Content-Type": "application/json",
//     },
//   });

//   if (!response.ok) {
//     const err = await response.text();
//     throw new Error("PayPal Verification Failed: " + err);
//   }

//   const order = await response.json();
//   return order; 
//   // order.status === "COMPLETED" means payment successful
//   // order.purchase_units[0].payments.captures[0].id is the transaction ID
// }



import dotenv from "dotenv";
dotenv.config();

const PAYPAL_BASE_URL = "https://api-m.sandbox.paypal.com";


// console.log("PAYPAL_CLIENT_ID:", process.env.PAYPAL_CLIENT_ID);
// console.log("PAYPAL_CLIENT_SECRET:", process.env.PAYPAL_CLIENT_SECRET);

// 🔐 Get PayPal access token
const getAccessToken = async () => {
  const auth = Buffer.from(
    `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`
  ).toString("base64");

  const response = await fetch(`${PAYPAL_BASE_URL}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  const data = await response.json();

  if (!data.access_token) {
    console.error("PayPal token error:", data);
    throw new Error("Failed to get PayPal access token");
  }

  return data.access_token;
};

// 🧾 Create PayPal order
export const createPayPalOrder = async (amount) => {
  const accessToken = await getAccessToken();

  const response = await fetch(`${PAYPAL_BASE_URL}/v2/checkout/orders`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: Number(amount).toFixed(2),
          },
        },
      ],
    }),
  });

  const data = await response.json();

  if (!data.id) {
    console.error("PayPal create order failed:", data);
    throw new Error("PayPal order creation failed");
  }

  return data;
};

// 💰 Capture PayPal payment
export const capturePayPalOrder = async (orderId) => {
  const accessToken = await getAccessToken();

  const response = await fetch(
    `${PAYPAL_BASE_URL}/v2/checkout/orders/${orderId}/capture`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    }
  );

  const data = await response.json();

  if (data.status !== "COMPLETED") {
    console.error("PayPal capture failed:", data);
    throw new Error("PayPal payment not completed");
  }

  return data;
};
