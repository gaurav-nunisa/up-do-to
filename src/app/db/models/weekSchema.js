import mongoose from "mongoose";
const weekSchema = new mongoose.Schema({
  weekData: {
    totalTask: {
      type: Number,
    },
    completedTask: {
      type: Number,
    },
    unCompletedTask: {
      type: Number,
    },
  },
});
const Week = mongoose.model("Week", weekSchema);
export default Week;
