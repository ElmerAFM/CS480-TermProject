import express from "express";
import config from "./config";
import productRoutes from "./routes/productRoutes";
import { initializeDatabase } from "./db";
import "./models/index"; // Import models to register them with Sequelize

const app = express();

app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use("/", productRoutes);

// Initialize database then start server
initializeDatabase()
  .then(() => {
    app.listen(config.port, () => {
      console.log(`Server running in ${config.nodeEnv} mode on port ${config.port}`);
    });
  })
  .catch((error) => {
    console.error("Failed to start server:", error);
    process.exit(1);
  });
