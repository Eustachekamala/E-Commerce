import { Route, Routes } from "react-router-dom"
import AuthLayout from "./components/auth/Layout"
import AuthLogin from "./pages/auth/Login"
import AuthRegister from "./pages/auth/Register"
import AdminLayout from "./components/admin/Layout"
import AdminDashboard from "./pages/admin/Dashboard"
import AdminFeatures from "./pages/admin/Features"
import AdminProducts from "./pages/admin/Products"
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
import AdminOrdersList from "./pages/admin/Orders"
import PaypalReturnPage from "./pages/shopping/Paypal-return"
import PaymentSuccessPage from "./pages/shopping/Payment-success"
import PaymentFaildPage from "./pages/shopping/Payment-faild"
import Search from "./pages/shopping/Search"

function App() {
 const {user, isAuthenticated, isLoading } = useSelector(state => state.auth)
 const dispatch = useDispatch();

 useEffect(() => {
  const token =  JSON.parse(sessionStorage.getItem('token'))
  dispatch(checkAuth(token))
 }, [dispatch])

//   useEffect(() => {
//   dispatch(checkAuth())
//  }, [dispatch])

 if (isLoading) {
  return (
    <div className="flex items-center justify-center w-full h-screen">
          <Loader2 className="w-20 h-20 text-primary animate-spin" />
    </div>
  );
} 

  return (
    <div>
      {/** common component */}
      <Routes>
        <Route path="/" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
          </CheckAuth>
        }/>
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
            <Route path="orders" element={<AdminOrdersList/>}/>
         </Route>
         <Route path="/shop" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <ShoppingLayout/>
          </CheckAuth>
         }>
            <Route path="account" element={<ShoppingAccoount/>}/>
            <Route path="checkout" element={<ShopingCheckout/>}/>
            <Route path="home" element={<ShoppingHome/>}></Route>
            <Route path="listing" element={<ShoppingListing/>}/>
            <Route path="search" element={<Search/>}/>
            <Route path="paypal-return" element={<PaypalReturnPage/>}/>
            <Route path="payment-success" element={<PaymentSuccessPage/>}/>
            <Route path="payment-faild" element={<PaymentFaildPage/>}/>
         </Route>
        <Route path="/unauth-page" element={<Unauthorized/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>

    </div>
  )
}

export default App
