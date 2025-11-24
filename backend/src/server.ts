import express from "express";
import { sequelize, Product } from "./db";

const app = express();

app.use(express.json());

const firstproduct = await Product.create({
  name: "Sample Product",
  description: "This is a sample product.",
  price: 19.99,
  category: "Sample Category",
  image: "sample-image-url",
});

app.get("/products", async (request, response) => {
  const products = await Product.findAll();
  response.json(products);
});

export default app;
