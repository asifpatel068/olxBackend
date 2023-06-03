const express=require("express");
const { ProductModel } = require("../Model/product");

const productRoute=express.Router()

productRoute.post("/",async(req,res)=>{
    const payload=req.body;
    try{
        const product=ProductModel(payload)
        await product.save();
        res.send({message:"Product Added Successfully"})
    }catch(err){
        return res.send({message:err.message})
    }
})

productRoute.get("/",async(req,res)=>{
    const query=req.query;
    
    try{
        const products=await ProductModel.find(query)
      
        res.send({data:products})
    }catch(err){
        return res.send({message:err.message})
    }
})

productRoute.get("/:id",async(req,res)=>{
    const id=req.params.id;
   
    try{
        const product=await ProductModel.findOne({_id:id})
        res.send({data:product})
    }catch(err){
        return res.send({message:err.message})
    }
})

productRoute.patch("/:id",async(req,res)=>{
    const id=req.params.id;
    const payload=req.body;
    try{
        await ProductModel.findByIdAndUpdate({_id:id},payload)
        res.send({message:"products updated successfully"})
    }catch(err){
        return res.send({message:err.message})
    }
})

productRoute.delete("/:id",async(req,res)=>{
    const id=req.params.id;
    try{
        const product=await ProductModel.findByIdAndDelete({_id:id})
        res.send({message:"products deleted successfully"})
    }catch(err){
        return res.send({message:err.message})
    }
})


module.exports={
    productRoute
}