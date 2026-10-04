import CrudRepository from "./crud-repository.js";
import db from "../models/index.js";
import { appError } from "../utils/errors/app-error.js";
import { StatusCodes } from "http-status-codes";
import { Op } from "sequelize";
import { Enums } from '../utils/common/index.js';
const { BOOKED,CANCELLED } = Enums.BOOKING_STATUS;

class BookingRepository extends CrudRepository{
    constructor(){
        super(db.Booking);
    }
    async createBooking(data,transaction){
        const response=await db.Booking.create(data,{transaction:transaction});
        return response;
    }
    async get(data,transaction){
        const response=await this.model.findByPk(data,{transaction:transaction});
        if(!response){
            throw new appError("Not able to find the resource",StatusCodes.NOT_FOUND);
        }
        return response;
    }
    async update(id,data,transaction){
        const response=await this.model.update(data,{where:{id:id}},{transaction:transaction});
        return response;
    }

    async cancelOldBookings(timestamp){
        const response=await db.Booking.update(({status:CANCELLED}),{
           where:{
            [Op.and]:[
                {
                    createdAt:{
                        [Op.lt]:timestamp
                    }
                },
                {
                    status:{
                        [Op.ne]:BOOKED
                    }
                },
                {
                    status:{
                        [Op.ne]:CANCELLED
                    }
                }
            ]
           }
        });
        return response;
    }
}
export default BookingRepository;
