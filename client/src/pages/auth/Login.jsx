import CommonForm from "@/components/common/Form";
import { loginFormControls } from "@/config";
import { loginUser } from "@/store/auth-slice";
import { useState } from "react"
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom"
import { toast } from "sonner";


const AuthLogin = () => {
  const initialState = {
    email : "",
    password: ""
  }

  const dispatch = useDispatch();

  const [formData, setFormData ] = useState(initialState);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData)).then(data => {
      if (data.payload?.success) {
        toast.success(data.payload.message,
          {
          style: {
            background: 'green',
            color: 'white'
          }
        });

        // setTimeout(() => {
        //   navigate("/shop");
        // }, 1000);
       } else {
          toast.error(data.payload.message, {
              style: {
              background: 'red',
              color: 'white'
            }
          });
       };
    });
  };

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Sing in to your account</h1>
          <p className="mt-2">Don&apos;t have an account<Link className="font-medium ml-2 text-primary hover:underline" to="/auth/register">Register</Link> </p>
      </div>
      <CommonForm
        formControls={loginFormControls}
        buttonText={"Sign In"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  )
}

export default AuthLogin
