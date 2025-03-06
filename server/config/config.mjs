import dotenv from "dotenv";

dotenv.config();

const config = Object.freeze({
    port: process.env.PORT || 8000,
    databaseURI : process.env.MONGODB_URI,
    nodeENV : process.env.NODE_ENV || "development",
    accesTokenSecret : process.env.JWT_SECRET,
    client_base_url : process.env.CLIENT_BASE_URL,
    cloud_name : process.env.CLOUD_NAME,
    cloud_api_key : process.env.CLOUD_API_KEY,
    cloud_api_secret : process.env.CLOUD_API_SECRET,
    paypal_client_id : process.env.PAYPAL_CLIENT_ID,
    paypal_client_secret : process.env.PAYPAL_CLIENT_SECRET
})

export default config;