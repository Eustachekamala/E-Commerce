import { logoutUser } from "@/store/auth-slice";
import { Button } from "../ui/button"
import { AlignJustify, LogOut } from "lucide-react"
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

const AdminHeader = ({setOpen}) => {
  const dispatch = useDispatch();
  function handleLogOut(){
    dispatch(logoutUser())
    toast.success("Logout successful",
          {
          style: {
            background: 'white',
            color: 'green',
          },
    })
  }

  return (
    <header className="flex items-center justify-between w-full px-4 py-3 bg-background border-b">
      {/* Left-aligned button (toggle menu) */}
      <Button onClick={() => setOpen(true)} className="lg:hidden sm:block">
        <AlignJustify />
        <span className="sr-only">Toggle Menu</span>
      </Button>

      {/* Right-aligned logout button */}
      <div className="flex justify-end flex-1">
        <Button onClick={handleLogOut} className="inline-flex gap-2 items-center rounded-md px-4 py-2 text-sm font-medium shadow">
          <LogOut />
          Logout
        </Button>
      </div>
    </header>
  )
}

AdminHeader.propTypes = {
  setOpen: PropTypes.bool
}

export default AdminHeader