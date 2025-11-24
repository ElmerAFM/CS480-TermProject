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

app.get("/products/:id", async (request, response) => {
  const product = await Product.findByPk(request.params.id);
  if (product) {
    response.json(product);
  } else {
    response.status(404).json({ error: "Product not found" });
  }
});

app.post("/products", async (request, response) => {
  const newProduct = await Product.create(request.body);
  response.status(201).json(newProduct);
});

app.put("/products/:id", async (request, response) => {
  const product = await Product.findByPk(request.params.id);
  if (product) {
    await product.update(request.body);
    response.json(product);
  } else {
    response.status(404).json({ error: "Product not found" });
  }
});

app.delete("/products/:id", async (request, response) => {
  const product = await Product.findByPk(request.params.id);
  if (product) {
    await product.destroy();
    response.status(204).end();
  } else {
    response.status(404).json({ error: "Product not found" });
  }
});

export default app;
