import mongoose from "mongoose";
const weekSchema = new mongoose.Schema({
  startDate : {
    type : Date,
    required : true
  },
  endDate : {
    type : Date,
    required : false
  },
  weekData: {
    totalTask: {
      type: Number,
    },
    completedTask: {
      type: Number,
    },
    uncompletedTask: {
      type: Number,
    },
  },
  todos :[{
    type : mongoose.Schema.Types.ObjectId,
    ref : 'Todo'
  }]
});
const Week = mongoose.models.Week || mongoose.model("Week", weekSchema);
export default Week;