import { Route, Routes } from "react-router-dom"
import AuthLayout from "./components/auth/Layout"
import AuthLogin from "./pages/auth/Login"
import AuthRegister from "./pages/auth/Register"

function App() {
 

  return (
    <div>
      {/** common component */}
  
      <Routes>
         <Route path="/auth" element={<AuthLayout/>}>
            <Route path="login" element={<AuthLogin/>}/>
            <Route path="register" element={<AuthRegister/>}/>
         </Route>
      </Routes>

    </div>
  )
}

export default App
