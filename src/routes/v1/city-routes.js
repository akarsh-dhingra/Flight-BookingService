import express from "express";
import { cityMiddleware } from "../../middlewares/index.js";
import { cityController } from "../../controllers/index.js";

const router=express.Router();


router.post("/",cityMiddleware.validateCreateRequest,cityController.createCity);

export default router;