import { NextResponse } from "next/server";
import { connectDB } from "@/app/db/connect";
import Todo from "@/app/db/models/todoSchema";
import Day from "@/app/db/models/daySchema";



export async function PUT ( request: Request, {params} : {params : {id : string}}){
    try{
        await connectDB()
        const body = await request.json()
        const updatedTodo = await Todo.findByIdAndUpdate(params.id,{
            text : body.text,
            
            completed : body.completed},
            {new : true}

        )
        if(!updatedTodo){
            return NextResponse.json({message : "Todo not found"}, {status : 404})
        }

        return NextResponse.json(updatedTodo)
    }catch(error){
        return NextResponse.json({message : "Failed to update todo"}, {status : 500})
    }
}


export async function DELETE(request : Request, {params} : {params : {id : string}}){
    try{
        await connectDB()
        const todo = await Todo.findByIdAndDelete(params.id)
        await Day.findByIdAndUpdate(
            todo.day,{
                $pull : {
                    todos : todo._id
                }
            }
        )
        return NextResponse.json({message : "Todo deleted successfully"})
    }catch(error){
        return NextResponse.json({message : "Failed to delete todo"}, {status : 500})
    }

}
