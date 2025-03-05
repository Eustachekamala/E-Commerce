import express from "express"
import config from "./config/config.mjs";
import connectDB from "./config/database.mjs";
import cookieparser from "cookie-parser";
import cors from "cors";
import globalErrorHandler from "./middlewares/globalErrorHandler.mjs";
import authRoutes from "./routes/auth/authRoutes.mjs"
import adminProductRouter from "./routes/admin/product-routes.mjs"
import adminOrderRouter from "./routes/admin/order-routes.mjs"
import shopProductRouter from "./routes/shop/products-route.mjs"
import shopCartRouter from "./routes/shop/cart-routes.mjs"
import shopAddressRouter from "./routes/shop/address-routes.mjs"
import shopOrderRouter from "./routes/shop/order-routes.mjs"
import shopSearchRouter from "./routes/shop/search-routes.mjs"
import shopReviewRouter from "./routes/shop/product-review-routes.mjs"

const app = express();
const PORT = config.port;


//Connexion to the Database
connectDB();


app.use(cors({
    origin: ["http://localhost:3000", "http://192.168.88.242:3000"],
    methods : ['GET', 'POST', 'DELETE', 'PUT'],
    allowedHeaders : [
        "Content-Type",
        "Authorization",
        "cache-control",
        "Expires",
        "Pragma"
    ],
    credentials: true
}));

app.use(express.json());
app.use(cookieparser());

app.get('/', (req, res) =>{
    res.status(200).send({message: "welcome to the e-commere api"});
})

app.use("/api/auth",authRoutes);

app.use(globalErrorHandler);
app.use('/api/admin/products',adminProductRouter);
app.use('/api/admin/orders',adminOrderRouter);
app.use('/api/shop/products', shopProductRouter);
app.use('/api/shop/cart', shopCartRouter);
app.use('/api/shop/address', shopAddressRouter);
app.use('/api/shop/order', shopOrderRouter);
app.use('/api/shop/search', shopSearchRouter);
app.use('/api/shop/review', shopReviewRouter)

app.listen(PORT, () => {
    console.log(`E-commerce running on port ${PORT}`);
    
})
