import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/db"; // Your MySQL database connection

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { review, rating, email, productID, orderID } = req.body;

  try {
    const [{ userID }] = await db.query("SELECT userID FROM users WHERE email = ?", [email]);

    await db.query(
      "INSERT INTO reviews (review, rating, userID, productID, orderID) VALUES (?, ?, ?, ?, ?)",
      [review, rating, userID, productID, orderID]
    );

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Failed to submit review:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
