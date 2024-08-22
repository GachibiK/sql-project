import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/db"; // Your MySQL database connection

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email } = req.query;

  try {
    const [order] = await db.query(
      "SELECT orderID FROM orders WHERE userID = (SELECT userID FROM users WHERE email = ?)",
      [email as string]
    );

    if (order) {
      res.status(200).json(order);
    } else {
      res.status(404).json({ error: "Order not found" });
    }
  } catch (error) {
    console.error("Failed to check order:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
