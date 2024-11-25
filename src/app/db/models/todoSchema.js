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
    }
})
export default mongoose.models.Todo || mongoose.model("Todo", TodoSchema);