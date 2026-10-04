import { BookingService } from "../services/index.js";

import db from "../models/index.js";
import successResponse from "../utils/common/success-response.js";
import { StatusCodes } from "http-status-codes";
import errorResponse from "../utils/common/error-response.js";
import bookingService from "../services/booking-service.js";

export async function CreateBooking(req,res) {
    try {
        const response= await BookingService.createBooking({
            flightId: req.body.flightId,
            noofSeats: req.body.noofSeats,
            userId: req.body.userId
        });
        successResponse.data=response;
        return res.status(StatusCodes.OK).json(successResponse);
    } catch (error) {
        errorResponse.error=error;
        return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse);
    }
}

export async function makePayment(req,res) {
    try {
        const response=await bookingService.makePayment({
            totalCost:req.body.totalCost,
            userId:req.body.userId,
            bookingId: req.body.bookingId
        });
        successResponse.data=response;
        return res.status(StatusCodes.OK).json(successResponse);
    } catch (error) {
        errorResponse.error=error;
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse);
    }   
}