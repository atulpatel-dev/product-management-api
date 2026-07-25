const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/AppError");
const User = require("../models/user")

exports.registerUser = asyncHandler(async(req , res)=>{
    
    const { name , email , password} = req.body;

    const existingUser = await User.findOne({email});
    if(existingUser){
        throw new AppError("Email already exist" , 400);
    }

    const hashPassword = await bcrypt.hash(password ,10);

    const user = new User({
        name, 
        email,
        password: hashPassword,
    });

    await user.save();

    return res.status(201).json({
        success: true,
        message: "User register successfully"
    })
})

exports.loginUser = asyncHandler(async(req , res)=>{

    const {email , password} = req.body;

    const user = await User.findOne({email});

    if(!user){
        throw new AppError("Invalid email or password" , 401)
    }

    const isMatching = await bcrypt.compare(password , user.password);

    if(!isMatching){
        throw new AppError("Invalid email or password" , 401);
    }

    const token = jwt.sign(
        {id: user._id},
        process.env.JWT_SECRET,
        {
            expiresIn: "7d"
        }
    );

    return res.status(200).json({
        success: true,
        token
    })

})


exports.getProfile = asyncHandler(async(req  , res)=>{

    const user = await User.findById(req.user.id).select("-password");

    if(!user){
        throw new AppError("user not found " , 404);
    }

    return res.status(200).json({
        success: true,
        user,
    })
})