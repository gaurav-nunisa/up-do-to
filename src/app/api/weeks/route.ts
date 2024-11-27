import Week from "@/app/db/models/weekSchema"
import {NextResponse } from "next/server"
import {connectDB} from "@/app/db/connect"

export async function POST(request : Request){
    try {
        await connectDB()
        const body = await request.json()
        console.log("recieved body for week", body)

        const newWeek = await Week.create({totalTask : body.totalTask, completedTask : body.completedTask, uncompletedTask : body.uncompletedTask})


        const verifiedWeek = await Week.findById(newWeek._id)
        console.log("Created week: ", newWeek)
        console.log("Verified Week:", verifiedWeek)
        return NextResponse.json(newWeek)

        
    } catch (error) {
        console.log("Week creation Error : ", error)
        return NextResponse.json({
            message : "Failed to create Week",
            error : error.message
        }, {status : 500})
        
    }
}




