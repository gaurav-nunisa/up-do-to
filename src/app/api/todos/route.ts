import { NextResponse } from "next/server";
import { connectDB } from "@/app/db/connect";
import Todo from "@/app/db/models/todoSchema";
import Week from "@/app/db/models/weekSchema";
import Day from "@/app/db/models/daySchema";

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    console.log("Received todo data:", body);
    
    // Create the todo
    const todo = await Todo.create({
      text: body.text,
      completed: body.completed,
      day: body.day,
      week: body.week  // Make sure this is being passed from the client
    });
    console.log("Created todo:", todo);

    // Update Day document
    const updatedDay = await Day.findByIdAndUpdate(
      body.day,
      {
        $push: {
          todos: todo._id,
        },
      },
      { new: true }
    );

    // Update Week document
    if (body.week) {
      const updatedWeek = await Week.findByIdAndUpdate(
        body.week,
        {
          $push: {
            todos: todo._id,
          },
        },
        { new: true }
      );
      if (!updatedWeek) {
        console.error("Week not found:", body.week);
      }
    }

    if (!updatedDay) {
      console.error("Day not found:", body.day);
      return NextResponse.json({ message: "Day not found" }, { status: 404 });
    }

    return NextResponse.json(todo);
  } catch (error) {
    console.error("Failed to create todo:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });
    return NextResponse.json(
      { message: "Failed to create todo", error: error.message },
      { status: 500 }
    );
  }
}