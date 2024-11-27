import { NextResponse } from "next/server";
import { connectDB } from "@/app/db/connect";
import Todo from "@/app/db/models/todoSchema";

import Day from "@/app/db/models/daySchema";

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    console.log("Received todo data:", body);
    const todo = await Todo.create({
      text: body.text, // Make sure these field names match
      completed: body.completed,
      day: body.day,
    });
    console.log("Created todo:", todo);

    const updatedDay = await Day.findByIdAndUpdate(
      body.day,
      {
        $push: {
          todos: todo._id,
        },
      },
      { new: true }
    );
    if (!updatedDay) {
      console.error("Day not found:", body.day);
      return NextResponse.json({ message: "Day not found" }, { status: 404 });
    }

    return NextResponse.json(todo);
  } catch (error) {
    console.error("Failed to initialize day:", {
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
export async function GET(request: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const day = searchParams.get("day");
    const todos = await Todo.find({ day: day });
    if (day) {
      const todos = await Todo.find({ day: day });
      return NextResponse.json(todos.length > 0 ? todos : []);
    } else {
      // If no day is provided, fetch all todos
      const allTodos = await Todo.find();
      return NextResponse.json(allTodos);
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch todo" },
      { status: 500 }
    );
  }
}
