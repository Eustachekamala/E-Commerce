import { Route, Routes } from "react-router-dom"
import AuthLayout from "./components/auth/Layout"
import AuthLogin from "./pages/auth/Login"
import AuthRegister from "./pages/auth/Register"
import AdminLayout from "./components/admin/Layout"
import AdminDashboard from "./pages/admin/Dashboard"
import AdminFeatures from "./pages/admin/Features"
import AdminProducts from "./pages/admin/Products"
import AdminOrders from "./pages/admin/Orders"
import ShoppingLayout from "./components/shopping/Loyout"
import NotFound from "./pages/Not-found/NotFound"
import ShoppingAccoount from "./pages/shopping/Account"
import ShopingCheckout from "./pages/shopping/Checkout"
import ShoppingHome from "./pages/shopping/Home"
import ShoppingListing from "./pages/shopping/Listing"
import CheckAuth from "./components/common/Check-auth"
import Unauthorized from "./pages/unauth-page/Unauthorized"
import { useDispatch, useSelector } from "react-redux"
import { Loader2 } from "lucide-react"
import { useEffect } from "react"
import { checkAuth } from "./store/auth-slice"

function App() {
 const {user, isAuthenticated, isLoading } = useSelector(state => state.auth)
 const dispatch = useDispatch();

 useEffect(() => {
  dispatch(checkAuth())
 }, [dispatch])

 if (isLoading) {
  return (
    <div className="flex items-center justify-center w-full h-screen">
          <Loader2 className="w-20 h-20 text-primary animate-spin" />
    </div>
  );
}


 console.log(isLoading, user);
 

  return (
    <div>
      {/** common component */}
      <Routes>
         <Route path="/auth" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AuthLayout/>
          </CheckAuth>
         }>
            <Route path="login" element={<AuthLogin/>}/>
            <Route path="register" element={<AuthRegister/>}/>
         </Route>
         <Route path="/admin" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AdminLayout/>
          </CheckAuth>
         }>
            <Route path="dashboard" element={<AdminDashboard/>}/>
            <Route path="features" element={<AdminFeatures/>}/>
            <Route path="products" element={<AdminProducts/>}/>
            <Route path="orders" element={<AdminOrders/>}/>
         </Route>
         <Route path="/shop" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <ShoppingLayout/>
          </CheckAuth>
         }>
            <Route path="account" element={<ShoppingAccoount/>}></Route>
            <Route path="checkout" element={<ShopingCheckout/>}></Route>
            <Route path="home" element={<ShoppingHome/>}></Route>
            <Route path="listing" element={<ShoppingListing/>}></Route>
         </Route>
        <Route path="/unauth-page" element={<Unauthorized/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>

    </div>
  )
}

export default App
