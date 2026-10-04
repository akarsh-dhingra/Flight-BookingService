import express from "express";

import { BookingController } from "../../controllers/index.js";

const router=express.Router();


router.post("/",BookingController.CreateBooking);

router.post("/payment",BookingController.makePayment);

export default router;