const Product = require("../models/product");
const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/AppError");

exports.getProducts = asyncHandler(async (req, res) => {

    let query = {};

    if (req.query.search) {
        query.title = {
            $regex: req.query.search,
            $options: "i"
        };
    }
   const page = Number(req.query.page) || 1;
const limit = Number(req.query.limit) || 5;

const skip = (page - 1) * limit;

    const product = await Product.find(query)
    .skip(skip)
    .limit(limit)
    return res.status(200).json(product);
});

exports.createProduct = asyncHandler(async (req, res) => {
    const product = new Product(req.body);
    await product.save();
    return res.status(201).json(product);

});

exports.getsingleProduct = asyncHandler(async (req, res) => {

    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
        throw new AppError("Product not found " , 404)
    }
    return res.status(200).json(product);

});

exports.updateProduct = asyncHandler(async (req, res) => {

    const { id } = req.params;
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
        runValidators: true, new: true
    });

    if (!updatedProduct) {
       throw new AppError("Product not found", 404);
    };
    return res.status(200).json(updatedProduct);

});

exports.deleteProduct = asyncHandler(async (req, res) => {

    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
        throw new AppError("Product not found", 404);

    }
    return res.status(200).json({
        success: true,
        message: "Product deleted successfully"
    });
});