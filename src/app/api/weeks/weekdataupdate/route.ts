import weekSchema from "@/app/db/models/weekSchema";
import { NextResponse } from "next/server";

export async function PUT(request : Request){
    try {
        const body = await request.json()
        const updatedWeekData = await weekSchema.findOneAndUpdate(
            {startDate : body.startDate},
            {weekData: {
                totalTask: body.totalTask || 0,
                completedTask: body.completedTask || 0,
                uncompletedTask: body.uncompletedTask || 0,
              },}
             
        )
        return NextResponse.json(updatedWeekData)

        
    } catch (error) {
        console.log("error updating the week's data" , error.message)

        
    }
    
    
   

}