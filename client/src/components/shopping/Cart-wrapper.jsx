import PropTypes from "prop-types";
import { Button } from "../ui/button";
import {
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "../ui/sheet";
import UserCartItemsContent from "./Cart-items-content";
import { useNavigate } from "react-router-dom";

function UserCartwrapper({ cartItems, setOpenCartSheet }) {
  const navigate = useNavigate();

  const totalCartAmount =
    cartItems && cartItems.length > 0
      ? cartItems.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;

  return (
    <SheetContent className="sm:max-w-md overflow-y-scroll" aria-describedby="cart-description">
      <SheetHeader>
        <SheetTitle>Your cart</SheetTitle>
        <SheetDescription id="cart-description">
          This is your shopping cart. You can review and manage your items here.
        </SheetDescription>
      </SheetHeader>
      <div className="mt-8 space-y-4">
        {cartItems && cartItems.length > 0 ? (
          cartItems.map((item) => (
            <UserCartItemsContent key={item.productId} cartItem={item} />
          ))
        ) : (
          <p className="text-gray-500">No items in the cart.</p>
        )}
      </div>
      <div className="mt-8 space-y-4">
        <div className="flex justify-between items-center">
          <span className="font-bold">Total</span>
          <span className="font-bold">${totalCartAmount.toFixed(2)}</span>
        </div>
      </div>
      <Button
        onClick={() => {
          navigate("/shop/checkout");
          setOpenCartSheet(false);
        }}
        className="w-full mt-5 cursor-pointer"
      >
        Checkout
      </Button>
    </SheetContent>
  );
}

UserCartwrapper.propTypes = {
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      productId: PropTypes.string.isRequired,
      image: PropTypes.string,
      title: PropTypes.string,
      price: PropTypes.number,
      salePrice: PropTypes.number,
      quantity: PropTypes.number,
    })
  ),
  setOpenCartSheet: PropTypes.func.isRequired,
};

export default UserCartwrapper;