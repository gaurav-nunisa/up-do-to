import mongoose from "mongoose";

const DaySchema = new mongoose.Schema({
    date: {
        type: String,
        required: true,
        unique: true
    },
    todos: {
        type: [mongoose.Schema.Types.ObjectId],  // Changed: Simplified array definition
        ref: 'Todo',
        default: []  // Added: Default empty array
    }
});

// Remove any existing model to prevent OverwriteModelError
mongoose.models = {};

const Day = mongoose.model("Day", DaySchema);
export default Day;