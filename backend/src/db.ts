import { Sequelize } from "sequelize";

const sequelize = new Sequelize(process.env.DATABASE_URL!, {
  logging: false, // Set to console.log to see SQL queries
});

// Test database connection
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("Database connection established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    throw error;
  }
}

// Initialize database - sync all models
async function initializeDatabase() {
  try {
    await testConnection();
    await sequelize.sync({ alter: true });
    console.log("Database synchronized successfully.");
  } catch (error) {
    console.error("Failed to initialize database:", error);
    throw error;
  }
}

export { sequelize, initializeDatabase };
