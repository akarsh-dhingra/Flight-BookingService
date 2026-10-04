import cron from "node-cron";

import { BookingService } from "../../services/index.js";
export default function scheduleCrons(){
    cron.schedule('*/10 * * * * *',async ()=>{
        const time=Date.now()-1000*300;
        const response=await BookingService.cancelOldBookings();
        console.log(response);
    })
}
