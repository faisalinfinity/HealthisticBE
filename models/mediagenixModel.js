const mongoose=require("mongoose")

const mediagenixSchema=mongoose.Schema({
    text: String,
    url: String,
    date: String,
    email:String
})


const mediagenixModel=mongoose.model("mediagenix",mediagenixSchema)

module.exports=mediagenixModel