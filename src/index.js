import dotenv from "dotenv";
import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import apiRoutes from "./routes/index.js";
import logger from "./config/logger-config.js";
import db from "./models/index.js";
import scheduleCrons from "./utils/common/cron-jobs.js";

dotenv.config();
const app=express();

const PORT=process.env.PORT;

app.listen(PORT,async()=>{
    console.log(`Successfully runnig on ${PORT}`);
    logger.info("Successfully start the server",{});
    scheduleCrons();
});
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/api",apiRoutes);


