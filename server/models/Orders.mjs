import mongoose, { model } from "mongoose";


const OrderSchema = new mongoose.Schema({
    userId : String,
    cartItems : [
        {
            productId : String,
            title : String,
            image : String,
            price : String,
            salePrice : String,
            quantity : Number
        }
    ],

    addressInfo : {
        addressId : String,
        address : String,
        city : String,
        pincode : String,
        phone : String,
        notes : String
    },
    
    orderStatus : String,
    paymentMethod : String,
    paymentStatus : String,
    totalAmount : Number,
    orderDate : Date,
    orderUpadateDate : Date,
    paymentId : String,
    payerId : String
})

export default mongoose.model('OrderSchema', OrderSchema)