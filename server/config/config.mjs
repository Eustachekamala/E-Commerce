import dotenv from "dotenv";

dotenv.config();

const config = Object.freeze({
    port: process.env.PORT || 8000,
    databaseURI : process.env.MONGODB_URI,
    nodeENV : process.env.NODE_ENV || "development",
    accesTokenSecret : process.env.JWT_SECRET
})

export default config;