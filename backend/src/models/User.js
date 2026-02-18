import mongoose  from "mongoose";


const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
    },
    fullName:{
        type:String,
        required:true,
    },
    password:{
        type:String, 

        
        required:true,
    },
    profilepic:{
        type:String,
        default:"",
    },
},
{timestamps:true,
} //creates createdAt and updatedAt fields automatically
);
const User = mongoose.model('User', userSchema);//model name is User and schema is userSchema



 export default User;