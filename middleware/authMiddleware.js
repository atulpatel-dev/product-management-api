const jwt = require("jsonwebtoken");
const AppError = require("../utils/AppError");

const authMiddleware = (req , res , next )=>{

    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith("Bearer ")){
        throw new AppError("unauthorized" , 401)
    }
    // Extract token
    const token = authHeader.split(" ")[1];

    try{
        const decoded = jwt.verify(token , process.env.JWT_SECRET);
        // store User data
        req.user = decoded

        next();
    }catch(err){
        throw new AppError("Invalid or expired token", 401);
      
    }
};

module.exports = authMiddleware;