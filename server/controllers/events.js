import { pool } from '../config/database.js';

const getEvents = async (req, res) => {
  try {
    const q = `
      SELECT
        id,
        eventname   AS "eventName",
        sport,
        teams,
        datetime    AS "dateTime",
        venue,
        ticketprice AS "ticketPrice",
        image,
        description,
        submittedby AS "submittedBy",
        submittedon AS "submittedOn"
      FROM events
      ORDER BY id ASC;
    `;
    const { rows } = await pool.query(q);
    res.status(200).json(rows);
  } catch (error) {
    console.error('GET /events failed:', error);
    res.status(409).json({ error: error.message });
  }
};

export default { getEvents };
