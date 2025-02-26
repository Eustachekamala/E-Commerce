import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice"
import adminProductsSlice from "./admin/products-slice"
import shoppingProductSlice from "./shop/products-slice"
import shoppingCartSlice from "./shop/cart-slice"


const store = configureStore({
    reducer: {
        auth : authReducer,
        adminProducts : adminProductsSlice,
        shoppingProducts : shoppingProductSlice,
        shoppingCart : shoppingCartSlice
    }
})

export default store;