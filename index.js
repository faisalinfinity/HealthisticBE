const express = require("express");
const cors = require("cors");
const { productRoute } = require("./routes/productRoute");
const { userRoute } = require("./routes/userRoute");
const { connection } = require("./connection/connection");
const { cartRoute } = require("./routes/cartRoute");
const { orderRoute } = require("./routes/orderRoute");
const { adminOrderRoute } = require("./routes/admin.orderRoute");
const { adminProductRoute } = require("./routes/admin.productRoute"); 
const mediagenix = require("./routes/mediagenix");
const visitorRoute = require("./routes/visitorRoute");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/product", productRoute);
app.use("/users", userRoute);
app.use("/users/cart", cartRoute);
app.use("/users/order",orderRoute)
app.use("/admin/order",adminOrderRoute)
app.use("/admin/product",adminProductRoute)
app.use("/mediagenix",mediagenix)    
app.use("/portfolio",visitorRoute)   

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error);
  }
});
