import express from "express";

import { flightMiddleware } from "../../middlewares/index.js";

import { flightController } from "../../controllers/index.js";

const router=express.Router();

// /api/v1/flights POST
router.post("/",flightMiddleware.validateCreateRequest,flightController.createFlight);

// /api/v1/flights?trips=MUM-DEL

router.get("/",flightController.getAllFlights);

export default router;