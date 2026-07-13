require("dotenv").config()
const express = require("express");
const app = express();
const connectDB = require("./config/db");
const router = require("./routes/productRoutes");
const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const AppError = require("./utils/AppError");

app.use(express.json());

app.use(logger);

app.use("/products" , router)

app.get("/" , (req , res)=>{
    res.send("status clear")
});


app.use((req , res ,next)=>{
    next(new AppError(`Route ${req.originalUrl} "not found "` , 404))
})

app.use(errorHandler);

async function main() {
    await connectDB();
    app.listen(process.env.PORT , ()=>{
        console.log(`connected to server on port ${process.env.PORT}`)
    })
}

main();

