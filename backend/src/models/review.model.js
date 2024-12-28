import mongoose, { model } from 'mongoose'
const {Schema}=mongoose

const reviewSchema=new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    item:{
        type:Schema.Types.ObjectId,
        ref:"Item",
        required:true
    },
    rating:{
        type:Number,
        required:true,
        min:1,
        max:5,
    },
    comment:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
},{versionKey:false})


export default model("Review",reviewSchema)