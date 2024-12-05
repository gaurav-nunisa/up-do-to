import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
    text : {
        type : String,
        required : true
    },
    completed : {
        type : Boolean,
        default : false,
    },
    tags :{
        type : String,
        required : false
    },
    day : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Day",
        required : true
    },
    week :{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Week",
        required : false

    }
})
const Todo = mongoose.models.Todo || mongoose.model("Todo", TodoSchema);
export default Todo;