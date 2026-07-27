const AppError = require("../utils/AppError");
const adminMiddleware = (req , res , next)=>{

    if(req.user.role !== "admin"){
        throw new AppError("forbidden" , 403)
    }
     next();
}

module.exports = adminMiddleware;