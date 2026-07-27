const Product = require("../models/product");
const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/AppError");

exports.getProducts = asyncHandler(async (req, res) => {
  
    let query = {};
    let sort = {};

    if (req.query.search) {
        query.title = {
            $regex: req.query.search,
            $options: "i"
        };
    }
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;

    const skip = (page - 1) * limit;

    if (req.query.sort) {
       const field = req.query.sort.replace("-" , "");
       const order = req.query.sort.startsWith("-")? -1 : 1;
       sort[field] = order;
    }

    if(req.query.minPrice || req.query.maxPrice){
        query.price = {};

       if(req.query.minPrice) {
            query.price.$gte = Number(req.query.minPrice);
        }
        if(req.query.maxPrice){
        query.price.$lte = Number(req.query.maxPrice);
        }
    }

    const totalProduct = await  Product.countDocuments(query);
    const totalPages =  Math.ceil(totalProduct / limit);
    const currentPage = page
    const hasNextPage = page < totalPages
    const hasPreviousPage = page > 1
    const product = await Product.find(query)
        .sort(sort)
        .skip(skip)
        .limit(limit)
    return res.status(200).json({
        success: true,
        totalProduct,
        currentPage,
        totalPages,
        hasNextPage,
        hasPreviousPage,
        data: product
    });
});

exports.createProduct = asyncHandler(async (req, res) => {

    
    const product = new Product({
        ...req.body,
        owner: req.user.id,
    });
    await product.save();
    return res.status(201).json(product);

});

exports.getsingleProduct = asyncHandler(async (req, res) => {

    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
        throw new AppError("Product not found ", 404)
    }
    return res.status(200).json(product);
})
exports.updateProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if(!product){
        throw new AppError("product not found", 404);
    };

    if(product.owner.toString() !== req.user.id){
        throw new AppError("Forbidden", 403);
    };

    product.title = req.body.title;
    product.description = req.body.description;
    product.price  = req.body.price;

    await product.save();
    return res.status(200).json({
        success: true,
        message: "product update succesfully",
        product,
    })


});

exports.deleteProduct = asyncHandler(async (req, res) => {

   const product = await Product.findById(req.params.id);

   if(!product){
    throw new AppError("Product not found" , 404);
   }

   if(product.owner.toString()  !== req.user.id){
    throw new AppError("Forbidden" ,403);
   };

   await product.deleteOne();
   
    return res.status(200).json({
        success: true,
        message: "Product deleted successfully"
    });
});