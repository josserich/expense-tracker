// src/services/db.js
import * as SQLite from "expo-sqlite";

let dbInstance = null;

const DB_NAME = "expenseTracker";
const getDB = async () => {
  if (!dbInstance) {
    try {
      dbInstance = await SQLite.openDatabaseAsync(DB_NAME);
      console.log("📦 Database opened:", DB_NAME);
    } catch (err) {
      console.error("❌ Failed to open DB:", err);
      throw err;
    }
  }
  return dbInstance;
};

export default getDB;
