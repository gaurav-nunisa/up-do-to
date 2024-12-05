//day.todos is undefined

import { connectDB } from "@/app/db/connect";
import Day from "@/app/db/models/daySchema";
import { NextResponse } from "next/server";
import Todo from "@/app/db/models/todoSchema";




export async function GET(
    request: Request,
    { params }: { params: { id: string } }
  ) {
    try {
      await connectDB();
      const id =  await params.id;
      
      // First, get the raw day document
      const rawDay = await Day.findById(id);
      console.log("Raw day document:", rawDay);
      console.log("Raw todos array:", rawDay?.todos);
  
      // Then try to populate
      const day = await Day.findById(id)
        .populate({
          path: "todos",
          select: "_id text completed day",
          model: Todo // Explicitly specify the model
        })
        .lean()
        .exec();
      
      console.log("Populated day:", day);
      console.log("Populated todos:", day?.todos);
  
      if (!day) {
        return NextResponse.json([]);
      }
  
      return NextResponse.json(day.todos || []);
  
    } catch (error) {
      console.error("Error fetching day:", error);
      return NextResponse.json(
        { message: "Failed to fetch day and todos", error: error.message },
        { status: 500 }
      );
    }
  }