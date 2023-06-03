const express=require("express")
const { connection } = require("./Config/db")
const { userRouter } = require("./Router/userRoute")
const { productRoute } = require("./Router/productRoute")

const app=express()
const port=8000

app.use(express.json())

app.get("/",(req,res)=>{
    res.send("Welcome")
})

app.use("/user",userRouter)
app.use("/products",productRoute)

app.listen(port,async()=>{
    try{
        await connection
        console.log("connected to db")
    }catch(err){
        console.log(err)
        console.log("Not connected to db")
    }
    console.log("Server is running at port 8000")
})