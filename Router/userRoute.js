const express=require("express");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");
const { UserModel } = require("../Model/userModel");

const userRouter=express.Router()

userRouter.post("/signup",async(req,res)=>{
    const {email,password}=req.body;
    try{
        const userExits=await UserModel.findOne({email})
        if(userExits){
            return res.send({message:"user Already exists"})
        }
        bcrypt.hash(password,5,async(err,hash)=>{
            if(err){
                return res.send({message:err.message})
            }
            const user= UserModel({email,password:hash})
            await user.save()
            return res.send({message:"Signup Successfull"})
        })
    }catch(err){
        return res.send({message:err.message})
    }
})

userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    try{
        const user=await UserModel.findOne({email})
        if(user==null){
            return res.send({message:"User Not Registered"})
        }
        const hashedpas=user?.password
        bcrypt.compare(password,hashedpas,(err,result)=>{
            if(err){
                return res.send({message:err.message})
            }
            if(!result){
                return res.send({message:"Invalid Credentials"})
            }
            const token=jwt.sign({UserID:user._id},"NORMAL")
            return res.send({message:"Login Successfull",token})
        })
    }catch(err){
        return res.send({message:err.message})
    }
})


module.exports={
    userRouter
}