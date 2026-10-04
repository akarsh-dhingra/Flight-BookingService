// Acid Props
// Transactions 
// Isolation Levels

// Two or more different entities try to access the same resource then 
// Locking Mechanisms provided by sequelize : Multiple transactions
//  that are looking to change or maniuplate the data at the same time is know as locking 
// mechanism. 


import axios from "axios";

import { BookingRepository } from "../repositories/index.js";
import { Sequelize } from "sequelize";
import db from "../models/index.js";
import successResponse from "../utils/common/success-response.js";
import errorResponse from "../utils/common/error-response.js";
import { appError } from "../utils/errors/app-error.js";
import { StatusCodes } from "http-status-codes";
import { Enums } from '../utils/common/index.js';
const { BOOKED,CANCELLED } = Enums.BOOKING_STATUS;

const bookingRepository=new BookingRepository();
// Important: Earlier we were throwing the error inside a callback , but instead of putting a try catch over the top we should put it in there as well.
async function createBooking(data) {
  const transaction=await db.sequelize.transaction();
  try {
    const flight=await axios.get(`http://localhost:3000/api/v1/flights/${data.flightId}`);
    // Check the availabiliy of no of seats if not available throw an error 
    const flightData=flight.data.data;
    console.log(data);
    console.log(flightData);
    if(data.noofSeats>flightData.totalSeats){
        throw new appError('Not enough seats available',StatusCodes.BAD_REQUEST);
    }
    // If available then compute the booking amount 
    const totalBillingAmount=data.noofSeats*flightData.price;
    // Pass it into your data object
    const bookingPayload={...data,totalCost:totalBillingAmount};
    // Create the booking 
    const booking =await bookingRepository.createBooking(bookingPayload,transaction);
    // send a patch request to the service 
    await axios.patch(`http://localhost:3000/api/v1/flights/${data.flightId}/seats`,{
        seats:data.noofSeats,
        dec:true
    });
    await transaction.commit();
    return booking;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
}

async function makePayment(data) {
    const transaction=await db.sequelize.transaction();
    try {

        const bookingDetails=await bookingRepository.get(data.bookingId);
        
        const bookingTime= new Date(bookingDetails.createdAt);
        const currentTime= new Date();
        
        if(currentTime-bookingTime > 300000){
            await cancelBooking(data.bookingId);
            // Bring back the same number of seats that we actually reserved for booking 
            throw new appError("The booking has expired",StatusCodes.BAD_REQUEST);
        }
        // When we're canncelling the booking we would have to bring the same number of seats that we reserved for booking 
        // 
        // dt-t >5 toh booking will not go through 
        if(bookingDetails.totalCost != data.totalCost){
            throw new appError("The amount of the payment doesn't match",StatusCodes.BAD_REQUEST);
        }
        if(bookingDetails.userId!=data.userId){
            throw new appError("The amount of the payment doesn't match",StatusCodes.BAD_REQUEST);
        }
        // yahan tk aagya hu yahni I assume that payment was successful
        const response=await bookingRepository.update(data.bookingId,{status:BOOKED},transaction);
        await transaction.commit();
        return response;
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
}

async function cancelBooking(bookingId) {
    const transaction=await db.sequelize.transaction();
    try {
        const bookingDetails=await bookingRepository.get(bookingId,transaction);
        if(bookingDetails.status==CANCELLED){
            await transaction.commit();
            return true;
        }
        await axios.patch(`http://localhost:3000/api/v1/flights/${bookingDetails.flightId}/seats`,{
            seats:bookingDetails.noofSeats,
            dec:false
        });
        await bookingRepository.update(bookingId,{status:CANCELLED},transaction);
        await transaction.commit();
        return true;
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
}

async function cancelOldBookings() {
    try {
        const time=new Date(Date.now()-1000*300); // time 5 mins ago
        const response=await bookingRepository.cancelOldBookings(time);
        return response;
    } catch (error) {
        console.log(error);
    }
}


const bookingService={createBooking,makePayment,cancelBooking,cancelOldBookings};
export default bookingService;

// Earlier 2: 
// return new Promise((resolve,reject)=>{
//     const result = db.sequelize.transaction(async (t) => {
//             const flight=await axios.get(`http://localhost:3000/api/v1/flights/${data.flightId}`);
//             console.log(data);
//             const flightData=flight.data.data;
//             if(data.noOfSeats> flightData.totalSeats){
//                 reject(new appError('Not enough seats available',StatusCodes.BAD_REQUEST));
//             }
//             resolve(true);
//     });
// })


// Earlien: try {
//     const result = db.sequelize.transaction(async (t) => {
//         const flight=await axios.get(`http://localhost:3000/api/v1/flights/${data.flightId}`);
//         console.log(data);
//         const flightData=flight.data.data;
//         if(data.noOfSeats> flightData.totalSeats){
//             reject(new appError('Not enough seats available',StatusCodes.BAD_REQUEST));
//         }
//         resolve(true);
// })
// return result;
// } catch (error) {
//     errorResponse.message = error.message;
//     errorResponse.error = {
//         name: error.name,
//         message: error.message,
//         explaination: error.explaination,
//         stack: process.env.NODE_ENV === 'production' ? undefined : error.stack
//     };
//     return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse);
// }