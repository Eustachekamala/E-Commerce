import mongoose from "mongoose";
import config from "./config.mjs";


const connectDB = async () => {
    try {
        const conn = await mongoose.connect(config.databaseURI);
        console.log(`MongoDB connected : ${conn.connection.host}`);
    } catch (error) {
        console.log(`Error : ${error.message}`)
        process.exit();
    }
}

export default connectDB;