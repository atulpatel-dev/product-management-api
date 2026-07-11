const Product = require("../models/product")

exports.getProducts = async (req, res) => {
    try {
        const product = await Product.find();
       return res.status(200).json(product);
    } catch (err) {
        res.status(500).json({
            message: "error in getProduct",
            error: err.message

        })
    }
}

exports.createProduct = async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
       return res.status(201
        
       ).json(product);
    } catch (err) {
        res.status(500).json({
            message: "error in createProduct",
            error: err.message
        })
    }
};

exports.getsingleProduct = async (req , res)=>{
    try{
        const {id} = req.params;
        const product = await Product.findById(id);
        if(!product){
            return res.status(404).json({message:"product not found"});
        }
       return res.status(200).json(product);
    }catch(err){
        res.status(500).json({
            message: "error fetching product",
            error: err.message
        })
    }
}

exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedProduct = await Product.findByIdAndUpdate(id, req.body ,{
            runValidators: true, new: true
        });

        if (!updatedProduct) {
            return res.status(404).json({ message: "Prduct not found" })
        };
        return res.status(200).json(updatedProduct);
    }catch(err){
        res.status(500).json({
            message: "error in updateProduct",
            error: err.message
        })
    }
};

exports.deleteProduct = async(req , res)=>{
    try{
        const {id} = req.params;
        const deletedProduct = await Product.findByIdAndDelete(id);
        if(!deletedProduct){
           return res.status(404).json({message: "page not found"});

        }
       return res.status(200).json({
            success: true,
            message: "Product deleted successfully"
        });
    }catch(err){
        res.status(500).json({
            message: "error in deleteProduct",
            error: err.message
        })
    }
}