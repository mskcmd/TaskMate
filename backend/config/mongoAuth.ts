import mongoose from "mongoose";

const dbURI: string = process.env.DB_URI || 'mongodb://localhost:27017/EventHive'; 

export async function connectedDB(): Promise<void>{
    try {
        await mongoose.connect(dbURI);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
        
    }
}