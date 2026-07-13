const AppError = require("../utils/AppError");

const errorHandler = (err , req , res , next)=>{

    if (err.name === "CastError") {
        err = new AppError("Invalid Product ID", 400);
    }
    if (err.name === "ValidationError"){
        const errors = Object.values(err.errors).map(val => val.message);

        err = new AppError(errors.join(","), 400);
    }

    res.status(err.statusCode || 500).json({
        success: false , 
        status: err.status || "error",
        message: err.message || "Internal server error"

    })

}

module.exports = errorHandler;