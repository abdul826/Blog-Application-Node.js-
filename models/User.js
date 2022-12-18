const mongoose = require('mongoose');
const bcryprt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        unique:true
    },
    profilePic:{
        type:String,
        default:''
    },
},
    {timestamps:true}
);

// Hash Passwrd
userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
      this.password = await bcryprt.hash(this.password, 12);
    //   this.cpassword = await bcrypr.hash(this.cpassword, 12);
    }
  
    next();
  });


const User = mongoose.model("User", userSchema);

module.exports = User;