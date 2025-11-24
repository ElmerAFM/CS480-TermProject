import Router from "express";
import multer from "multer";
import { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } from "../controllers/productController";

const upload = multer({ dest: "uploads/" });
const router = Router();

router.get("/products", getAllProducts);

router.get("/products/:id", getProductById);

router.post("/products", upload.single("image"), createProduct);

router.put("/products/:id", updateProduct);

router.delete("/products/:id", deleteProduct);

export default router;
