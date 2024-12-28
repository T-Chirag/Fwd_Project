const mongoose=require('mongoose')
const {Schema}=mongoose

const wishlistSchema=new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:"User",
        require:true
    },
    item:{
        type:Schema.Types.ObjectId,
        ref:"Item",
        require:true
    },
    note:{
        type:String,
    }
},{timestamps:true,versionKey:false})

module.exports=mongoose.model("Wishlist",wishlistSchema)