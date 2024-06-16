import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();


let isConnected = false;

export default async function connectDB() {
    mongoose.set('strictQuery', true); // Permet de s'assurer que les requêtes respectent le format des models.

    if(!process.env.MONGO_URI) return console.log('MONGO_URI required');
    if(isConnected) return console.log("Already connected!");

    try {
        await mongoose.connect(process.env.MONGO_URI as string);

        isConnected = true;

        console.log("Connected to database!");
    } catch (error) {
        console.log(error);
    }

};