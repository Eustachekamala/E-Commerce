import CommonForm from "@/components/common/Form";
import { registerFormControls } from "@/config";
import { registerUser } from "@/store/auth-slice";
import { useState } from "react"
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom"
import { toast } from "sonner";


const AuthRegister = () => {
  const initialState = {
    userName : "",
    email : "",
    password: ""
  }
  const navigate = useNavigate()

  const [formData, setFormData ] = useState(initialState);
  const dispatch = useDispatch();

    const onSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(formData)).then((data) => {
      if (data.payload?.success) {
        toast.success(data.payload.message,
          {
          style: {
            background: 'green',
            color: 'white',
            margin: "auto",
            textAlign: "center"
          }
        });

        setTimeout(() => {
          navigate("/auth/login");
        }, 1000); // Delay navigation
      } else {
        toast.error(data.payload.message, {
          style: {
            background: 'red',
            color: 'white',
            margin: "auto",
            textAlign: "center"
          }
        })
      }
    })
  };

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Create an account</h1>
          <p className="mt-2">Already have an account<Link className="font-medium ml-2 text-primary hover:underline" to="/auth/login">Login</Link> </p>
      </div>
      <CommonForm
        formControls={registerFormControls}
        buttonText={"Sign Up"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  )
}

export default AuthRegister
