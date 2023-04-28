const express=require("express")
const AuthorizationMiddleware = require("../middlewares/Authorization.middleware")
const { orderModel } = require("../models/orderModel")
const adminOrderRoute=express.Router()

adminOrderRoute.get("/",AuthorizationMiddleware,async(req,res)=>{
    const { userId } = req.body;
    const page = +req.query.page || 1;
    const limit = +req.query.limit || 10;
    const skip = (page - 1) * limit;
  
    const searchQuery = req.query?.q;
    const sortCriteria = req.query?.sort;
    const filterCriteria = req.query?.filter;
    try {
      let data = orderModel.find({ adminId: userId });
  
      if (sortCriteria) {
        let arr = sortCriteria.split(":"); //splitting the sortCriteria String by : and set object in the rqd format
        let obj = {};
        obj[arr[0]] = arr[1];
        data = data.sort(obj);
      }
      data = data.sort({ _id: -1 });
      if (filterCriteria && Array.isArray(filterCriteria)) {
        //Checking filtetCriteria is an array or not because if single filter is passed it received as one obj instead of array
        const filterArray = filterCriteria.map((el) => {
          let arr = el.split(":");
          let obj = {};
          obj[arr[0]] = arr[1];
          obj[arr[0]] = { $regex: arr[1], $options: "i" }; //regex is handling small or caps letter
  
          return obj;
        });
        data = data.and(filterArray);
      } else if (filterCriteria) {
        let obj = {};
        let arr = filterCriteria.split(":");
        obj[arr[0]] = { $regex: arr[1], $options: "i" };
  
        data = data.or([obj]);
      }
  
      if (searchQuery) {
        data = data.or([{ title: { $regex: searchQuery, $options: "i" } }]);
      }
      //Pagination
      const total = await orderModel.countDocuments(data); //Calculating all data for the given Query
      const totalPages = Math.ceil(total / limit); //Calculating totalPages
      const orderData = await data.skip(skip).limit(limit).exec(); // skip the data and limit
  
      res.json({
        page,
        limit,
        total,
        data: orderData,
        totalPages,
      });
    } catch (error) {
      res.status(400).send(error.message);
    }
})

adminOrderRoute.patch("/:id",async(req,res)=>{
     const {id}=req.params
    try {
        await orderModel.findByIdAndUpdate({_id:id},req.body)
        res.send("Updated Successfully")
    } catch (error) {
        res.send(error.message)
    }
})


module.exports={
    adminOrderRoute
}