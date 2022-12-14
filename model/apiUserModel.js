const mongoose = require('mongoose')
const Schema = mongoose.Schema
const UserSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    contact:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    status:{
        type:Boolean,
        default:true
    },
    created_at:{
        type:Date,
        default:Date.now
    }
})

const UserModel = new mongoose.model('user', UserSchema)
module.exports = UserModel
