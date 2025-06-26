import mongoose from "mongoose";
export const connectDB = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Database is connected");
    }catch(error){
        process.exit(1);
        console.log("There is err in connection ",error);
    }
}