import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice"
import adminProductsSlice from "./admin/products-slice"
import adminOrdersSlice from "./admin/orders-slice"
import shoppingProductSlice from "./shop/products-slice"
import shoppingCartSlice from "./shop/cart-slice"
import shoppingAddressSlice from "./shop/address-slice"
import shoppingOrderSlice from "./shop/order-slice"
import shoppingSearchSlice from "./shop/search-slice"


const store = configureStore({
    reducer: {
        auth : authReducer,
        adminProducts : adminProductsSlice,
        adminOrders : adminOrdersSlice,
        shoppingProducts : shoppingProductSlice,
        shoppingCart : shoppingCartSlice,
        shoppingAddress : shoppingAddressSlice,
        shoppingOrder : shoppingOrderSlice,
        shoppingSearch : shoppingSearchSlice
    }
})

export default store;