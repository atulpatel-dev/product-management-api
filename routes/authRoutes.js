
const express = require("express");
const router = express.Router();

const validate = require("../middleware/validate");
const authMiddleware = require("../middleware/authMiddleware");

const loginSchema = require("../validators/loginValidator");
const userSchema = require("../validators/userValidator");

const { registerUser, loginUser, getProfile,} = require("../controllers/authController");


router.post("/register" , validate(userSchema), registerUser);

router.post("/login", validate(loginSchema), loginUser );

router.get("/profile", authMiddleware , getProfile);

module.exports = router;


