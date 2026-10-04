import express from "express";
import { InfoController } from "../../controllers/index.js";
import BookingRoutes from "../v1/booking-routes.js";
const router=express.Router();
router.use("/bookings",BookingRoutes); 
router.get("/info",InfoController.info);

export default router;
