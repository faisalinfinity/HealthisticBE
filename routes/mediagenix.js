const express=require("express")
const mediagenixModel = require("../models/mediagenixModel")
const mediagenix=express.Router()

mediagenix.post("/",async(req,res)=>{
    try {
        const data=new mediagenixModel(req.body)
       await data.save()
       res.send("Added")
    } catch (error) {
        res.send(error.message)
    }
})

mediagenix.delete("/:id",async(req,res)=>{
    const {id}=req.params

    try {
        await mediagenixModel.findByIdAndDelete({_id:id})
        res.send("deleted")
    } catch (error) {
        res.send(error.message)
    }
})
mediagenix.get("/",async(req,res)=>{
     let {email}=req.body
    try {
        let data = await mediagenixModel.find({email:email})
        res.json(data)
    } catch (error) {
        res.send(error.message)
    }
})

module.exports=mediagenix