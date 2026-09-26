import dotenv from "dotenv";
import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import apiRoutes from "./routes/index.js";
import logger from "./config/logger-config.js";
import db from "./models/index.js";
import city from "./models/city.js";
dotenv.config();
const app=express();

const PORT=process.env.PORT;

app.listen(PORT,async()=>{
    console.log(`Successfully runnig on ${PORT}`);
    logger.info("Successfully start the server",{});
//  const city1=await db.City.findByPk(7);
//  const airport1=await city1.createAirport({name:'kempogSSSowda airport',code:'JAK'})
    // const maalKitnahai =await city1.getAirports();
    // await city1.removeAirport();

// This line will throw an error as this line will try to remove the airport from the city 
// But my db says that an 
// jab mai yeh krega toh airport toh rhega but cityid null hojayega and that should not occur...
// we're studying about onDelete Cascade and onUpdate Cascade
});
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/api",apiRoutes);


// // A router instance is a complete middleware and routing system for this reason it is often referred to as a "mini-app"
// const authenticate=(req,res,next)=>{
//     const token=req.headers.authorization?.split(' ')[1];

//     if(!token){
//         return res.status(401).json({
//             error: 'Unauthorized: Missing authentication token'
//         });
//     }
//     try {
//         const decoded=jwt.verify(token,process.env.JWT_SECRET);
//         req.user=decoded;
//         next();
//     } catch (error) {
//         return res.status(401).json({
//             error: 'Unauthorized: Invalid token'
//           });
//     }
// }
// const authorize = (req, res, next) => {
//     const userId = parseInt(req.params.userId);
//     if (req.user.role === 'admin' || req.user.id === userId) {
//       next();
//     } else {
//       res.status(403).json({
//         error: 'Forbidden: Insufficient permissions'
//       });
//     }
//   };

//   const users=[];

// app.post("/signUp",(req,res)=>{
//     const {username,password}=req.body;
//     users.push({username,password});
//     const token=jwt.sign()
// });

// app.post("/signIn",authenticate,(req,res)=>{

// });
