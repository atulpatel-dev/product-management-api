const express = require("express");
const router = express.Router();

const validate = require("../middleware/validate");
const productSchema = require("../validators/productValidator");

const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");


const {getProducts ,createProduct, getsingleProduct , updateProduct , deleteProduct } = require("../controllers/productController");

router.get("/", getProducts);

router.post("/",authMiddleware, upload.single("image")  ,validate(productSchema),  createProduct);
router.get("/:id" ,getsingleProduct );
router.put("/:id",authMiddleware , upload.single("image") ,validate(productSchema), updateProduct);
router.delete("/:id",authMiddleware, deleteProduct);

module.exports = router;