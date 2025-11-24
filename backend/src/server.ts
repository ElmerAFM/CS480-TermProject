import express from "express";
import path from "path";
import { Product } from "./db";
import upload from "./filestorage";

const app = express();

app.use(express.json());
app.use("/uploads", express.static("uploads"));

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

app.post("/products", upload.single("image"), async (request, response) => {
  if (!request.file) {
    return response.status(400).json({ error: "Image file is required" });
  }
  const newProduct = await Product.create({
    name: request.body.name,
    description: request.body.description,
    price: request.body.price,
    category: request.body.category,
    image: request.file.filename,
  });
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
