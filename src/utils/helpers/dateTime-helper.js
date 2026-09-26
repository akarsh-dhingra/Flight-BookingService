export function compareTime(timeString1, timeString2){
    let dateTime1=new Date(timeString1);
    let dateTime2=new Date(timeString2);
    return dateTime1.getTime()>dateTime2.getTime();
}

// epochTime: total time that has passed since 1 JAN 1970 ; 
