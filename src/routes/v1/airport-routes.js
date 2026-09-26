import express from "express";
import { airportController } from "../../controllers/index.js";
import { airportMiddleware } from "../../middlewares/index.js";
const router=express.Router();

// /api/v1/airports POST 

router.post("/",airportMiddleware.validateCreateRequest,airportController.createAirport);

// /api/v1/airports/:id GET 
router.get("/:id",airportController.getAirport);

// /api/v1/airports/ GET 
router.get("/",airportController.getAirports);

// /api/v1/airports/:id DELETE 

router.delete("/:id",airportController.destoryAirport);

export default router;