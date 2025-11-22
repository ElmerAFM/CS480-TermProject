import express from "express";

const app = express();
const PORT = 5000;

app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from the Express Backend!" });
});

app.listen(PORT, () => {
  console.log(`Backend server running at http://localhost:${PORT}`);
});
