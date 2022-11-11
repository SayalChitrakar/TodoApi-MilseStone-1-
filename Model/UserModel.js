const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'you must enter your name']
    },
    email:{
        type:String,
        required:[true,'you must enter your email'],
        validate:{
            validator:(email)=>{
                const emailString =  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
                if(email.match(email)){
                    return true;
                }
                else{
                    return false;
                }
            },
            message:"please enter valid email"
        }
    },
    password:{
        type:String,
        required:[true,'please enter your password'],
        select:false
    },
})

userSchema.pre('save',async function(next){
    this.password = await bcrypt.hash(this.password,12);
    next();
})

const User = mongoose.model('User',userSchema);
module.exports = User;
