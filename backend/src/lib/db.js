import mongoose from "mongoose";

export async function connectDb() {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`mongoDB connected: ${conn.connection.host}`);
        
    } catch (error) {
        console.log("MongoDB connetion error:" ,error);
        
    }
}