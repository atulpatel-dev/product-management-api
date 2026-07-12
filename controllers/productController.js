const Product = require("../models/product")
const asyncHandler = require("../utils/asyncHandler")

exports.getProducts = asyncHandler(async (req, res) => {
    const product = await Product.find();
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
        return res.status(404).json({ message: "product not found" });
    }
    return res.status(200).json(product);

});

exports.updateProduct = asyncHandler(async (req, res) => {

    const { id } = req.params;
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
        runValidators: true, new: true
    });

    if (!updatedProduct) {
        return res.status(404).json({ message: "Prduct not found" })
    };
    return res.status(200).json(updatedProduct);

});

exports.deleteProduct = asyncHandler(async (req, res) => {

    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
        return res.status(404).json({ message: "page not found" });

    }
    return res.status(200).json({
        success: true,
        message: "Product deleted successfully"
    });
});