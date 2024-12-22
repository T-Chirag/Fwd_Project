import mongoose from "mongoose";
import { db_name } from "../constants.js";


const connectDB = async() => {
    try{
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}/${db_name}`);
        console.log(`\n mongo db connected !! DB host:${connectionInstance.connection.host}`)
    }catch (e){
        console.log(e);
        process.exit(1) ;
    }
}


export default connectDB;