import {pool} from "./database.js";
import "./dotenv.js";
import eventData from "../data/events.js";

// 1) Create the events table
async function createEventsTable() {
  const createTableQuery = `
    DROP TABLE IF EXISTS events;

    CREATE TABLE IF NOT EXISTS events (
      id SERIAL PRIMARY KEY,
      eventName VARCHAR(255) NOT NULL,
      sport VARCHAR(255) NOT NULL,
      teams VARCHAR(255) NOT NULL,
      dateTime TIMESTAMP NOT NULL,
      venue VARCHAR(255) NOT NULL,
      ticketPrice VARCHAR(10) NOT NULL,
      image VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      submittedBy VARCHAR(255) NOT NULL,
      submittedOn TIMESTAMP NOT NULL
    );
  `;

  try {
    await pool.query(createTableQuery);
    console.log("✅ Events table created successfully");
  } catch (error) {
    console.error("❌ Error creating events table:", error);
  }
}

// 2) Seed the events table
const seedEventsTable = async () => {
  await createEventsTable();

  eventData.forEach((event) => {
    const insertQuery = {
      text:
        "INSERT INTO events (eventName, sport, teams, dateTime, venue, ticketPrice, image, description, submittedBy, submittedOn) " +
        "VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)",
    };

    const values = [
      event.eventName,
      event.sport,
      event.teams,
      event.dateTime,   // e.g., "2025-10-04T22:00:00"
      event.venue,
      event.ticketPrice,
      event.image,
      event.description,
      event.submittedBy,
      event.submittedOn, // e.g., "2025-09-25T10:00:00"
    ];

    pool.query(insertQuery, values, (err, res) => {
      if (err) {
        console.error("⚠️ error inserting event", err);
        return;
      }
      console.log(`✅ ${event.eventName} added successfully`);
    });
  });
};

// 3) Run the seeder
seedEventsTable();
