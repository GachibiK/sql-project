import type { NextApiRequest, NextApiResponse } from 'next';
import mysql from 'mysql2/promise';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const pool = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    // Ensure the connection is successful
    await pool.query('SELECT 1');

    const [rows] = await pool.query(
      'SELECT reviews.reviewID as id, users.username as user, reviews.rating, reviews.review FROM reviews INNER JOIN users ON reviews.userID = users.userid'
    );

    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ message: 'Failed to fetch reviews' });
  }
}
