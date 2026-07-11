require("dotenv").config()
const express = require("express");
const app = express();
const connectDB = require("./config/db");
const router = require("./routes/productRoutes")


app.use(express.json())
app.use("/products" , router)

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

app.get("/" , (req , res)=>{
    res.send("status clear")
});

async function main() {
    await connectDB();
    app.listen(process.env.PORT , ()=>{
        console.log(`connected to server on port ${process.env.PORT}`)
    })
}

main();