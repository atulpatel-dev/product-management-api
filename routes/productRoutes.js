const express = require("express");
const router = express.Router();

const validate = require("../middleware/validate");
const productSchema = require("../validators/productValidator");

const authMiddleware = require("../middleware/authMiddleware");


const {getProducts ,createProduct, getsingleProduct , updateProduct , deleteProduct } = require("../controllers/productController");

router.get("/", getProducts);

router.post("/",authMiddleware ,validate(productSchema), createProduct);
router.get("/:id" ,getsingleProduct );
router.put("/:id",authMiddleware ,validate(productSchema), updateProduct);
router.delete("/:id",authMiddleware, deleteProduct);

module.exports = router;