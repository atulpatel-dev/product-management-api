const express = require("express");
const router = express.Router();
const validateProduct = require("../middleware/validateProduct");


const {getProducts ,createProduct,getsingleProduct , updateProduct , deleteProduct } = require("../controllers/productController");

router.get("/", getProducts);

router.post("/",validateProduct, createProduct);
router.get("/:id" ,getsingleProduct );
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;