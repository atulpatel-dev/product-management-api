const express = require("express");
const router = express.Router();

const validate = require("../middleware/validate");
const productSchema = require("../validators/productValidator");


const {getProducts ,createProduct,getsingleProduct , updateProduct , deleteProduct } = require("../controllers/productController");

router.get("/", getProducts);

router.post("/",validate(productSchema), createProduct);
router.get("/:id" ,getsingleProduct );
router.put("/:id",validate(productSchema), updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;