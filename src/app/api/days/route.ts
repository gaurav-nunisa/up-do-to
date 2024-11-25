import { NextResponse } from "next/server";
import Day from "@/app/db/models/daySchema"
import { connectDB } from "@/app/db/connect"

export async function POST(request: Request) {
    try {
        await connectDB();
        const body = await request.json()
        console.log("recieved body for day", body);

        const checkForDay = await Day.findOne({date : body.day})
        if(checkForDay){
            console.log("Day already exists" , checkForDay)
            return NextResponse.json(checkForDay)
           
        }
        const newDay = await Day.create({date : body.day
            
        })

        const verifiedDay = await Day.findById(newDay._id)
        console.log('Created day:', newDay);  
        console.log('Verified day:', verifiedDay);
        return NextResponse.json(newDay)
        
    } catch (error) {
        console.error('Day creation error:', error);  // Add this
        return NextResponse.json({
            message: "Failed to create day",
            error: error.message
        }, {status: 500})
    }

}
