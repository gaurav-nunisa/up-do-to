import mongoose from "mongoose"
export async function connectDB(){
    try {
        await mongoose.connect("mongodb://localhost:27017/uptodolist")
        console.log("Connected to MongoDB")
    } catch (error) {
        console.log(error)
    }
}