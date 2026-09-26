import express from "express";
import { airplaneController } from "../../controllers/index.js";
import { airplaneMiddleware } from "../../middlewares/index.js";

const router=express.Router();
// /api/v1/airplanes POST 
router.post("/" , airplaneMiddleware.validateCreateRequest, airplaneController.createAirplane);
// /api/v1/airplanes GET 
router.get("/",airplaneController.getAirplanes);
// /api/v1/airplanes/:id GET 
router.get("/:id",airplaneController.getAirplane);
// /api/v1/airplanes/:id DELETE 
router.delete("/:id",airplaneController.destroyAirplane);

export default router;

