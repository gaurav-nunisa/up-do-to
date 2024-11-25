import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique : true,
        required: true
    },
    email: {type : String, 
        unique : true,
        required: true
    },
    password:{ type :String,
        unique:false,
        minLength: 6,
        required: true
    },
    role: {type : String},
    todo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Todo"
      }

   
,
})
const User = mongoose.model("User", UserSchema);
export default User