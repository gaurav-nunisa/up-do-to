import mongoose from "mongoose"

const MonthSchema = new mongoose.Schema({
    monthNumber : {
        type : Number,
        required : true,
        max : 12,
        min : 1
    },
    year : {
        type : Number,
        required : true
    },
    weeks :[{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Week"
    }]
});
export default mongoose.models.Month || mongoose.model("Month", MonthSchema)