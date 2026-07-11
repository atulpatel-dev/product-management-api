const express = require("express");
const app = express();
const connectDB = require("./config/db");
const router = require("./routes/productRoutes")

app.get("/" , (req , res)=>{
    res.send("status clear")
});
app.use(express.json())
app.use("/products" , router)

async function main() {
    await connectDB();
    app.listen(8080 , ()=>{
        console.log("connected to server on 8080")
    })
}

main();