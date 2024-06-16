import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

let isConnected = false;

const connectDB = async () => {
  mongoose.set('strictQuery', true); // Ensure queries adhere to model schema

    if (!process.env.MONGO_URI) {
        console.log('MONGO_URI required');
        return;
    }

    if (isConnected) {
        console.log("Already connected!");
        return;
    }

    let retries = 5; // Number of retry attempts
    let connected = false;

    while (retries > 0 && !connected) {
        try {
            await mongoose.connect(process.env.MONGO_URI as string, {
                serverSelectionTimeoutMS: 60000, // 60 seconds timeout for server selection
                socketTimeoutMS: 90000, // 90 seconds socket timeout
                connectTimeoutMS: 60000, // 60 seconds initial connection timeout
            });

            isConnected = true;
            connected = true;

            console.log("Connected to database!");
        } catch (error: Error | any) {
            console.error('Error connecting to MongoDB:', error.message);
            retries--;
            console.log(`Retrying (${retries} attempts left)...`);
            await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait for 5 seconds before retrying
        }
    }

    if (!connected) {
        console.error('Failed to connect to MongoDB after retries.');
        // Handle failure to connect
    }
};

export default connectDB;
