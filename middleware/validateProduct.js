const productSchema = require("../validators/productValidator");
const AppError = require("../utils/AppError");

const validateProduct = (req , res , next)=>{
    const {error} = productSchema.validate(req.body);
    if(error){
        return next(
            new AppError(error.details[0].message , 400)
        );

    }
    next();
};
 
module.exports = validateProduct;