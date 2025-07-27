const express=require("express");

const connectDb=require("./config/dbConnections")
const dotenv=require("dotenv").config();

connectDb();
const app=express();
const port=process.env.PORT||5001

app.use(express.json())// this is needed for the parsing the json file in post request
app.use("/api/admin" , require("./routes/adminRoutes"));//middelware  .use("/")this gives a common path on which the other routes are placed , require gives all the routess
// well we dont configure all our routes in the server.js for that we make a separate folder ROUTES in which the routes are handelled
// app.use("/api/public", require("./routes/publicRoutes"))
app.use("/api/auth", require("./routes/authRoutes"))

app.listen(port,()=>{
    console.log(`server is runing succesfully on port:${port}`);
})

