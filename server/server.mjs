import express from "express"
import config from "./config/config.mjs";
import connectDB from "./config/database.mjs";
import cookieparser from "cookie-parser";
import cors from "cors";
import globalErrorHandler from "./middlewares/globalErrorHandler.mjs";

const app = express();
const PORT = config.port;


//Connexion to the Database
connectDB();


app.use(cors({
    credentials: true,
    origin: ["http://localhost:3000"],
    methods : ['GET', 'POST', 'DELETE', 'PUT'],
    allowedHeaders : [
        "content-Type",
        "Authorization",
        "cache-control",
        "Expires",
        "Pragma"
    ]
}));

app.use(express.json());
app.use(cookieparser());

app.get('/', (req, res) =>{
    res.status(200).send({message: "welcome to the e-commere api"});
})

app.use(globalErrorHandler);

app.listen(PORT, () => {
    console.log(`E-commerce running on port ${PORT}`);
    
})
