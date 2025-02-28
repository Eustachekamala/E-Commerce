import PropTypes from "prop-types";
import { Button } from "../ui/button";
import { Minus, Plus, Trash } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItem, updateCartQuantity } from "@/store/shop/cart-slice";
import { toast } from "sonner";

function UserCartItemsContent({ cartItems }) {
    const { user } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    function handleCartItemDelete(getCartItem) {
        dispatch(deleteCartItem({ userId: user?.id, productId: getCartItem?.productId }))
          .then((data) => {
            if (data?.payload?.success) {
                toast.success("Cart Item is deleted successfully", {
                    style: {
                        background: "white",
                        color: "green",
                    },
                });
            } else {
                toast.error("Failed to delete product in the cart", {
                    style: {
                        background: "white",
                        color: "red",
                    },
                });
            }
        })
        .catch((error) => {
            console.error("Error adding to cart:", error);
            toast.error("An error occurred while adding to cart", {
                style: {
                    background: "white",
                    color: "red",
        
                },
            });
        });
    }

    function handleUpdateQuantity(getCartItem, typeOfAction){
      dispatch(updateCartQuantity({userId : user?.id, productId : getCartItem?.productId, quantity :
        typeOfAction === 'plus' ? 
        getCartItem?.quantity + 1 : getCartItem?.quantity - 1 })).then(data => {
          if(data?.payload?.success){
            toast.success("Cart item is updated", {
                      style: {
                          background: "white",
                          color: "green",
                      },
                  });
              } else {
                toast.error("Failed to update  cart", {
                    style: {
                        background: "white",
                        color: "red",
                    },
                });
            }
        })
    }

    return (
        <div className="flex items-center space-x-4">
            <img
                className="w-20 h-20 rounded object-cover"
                src={cartItems?.image}
                alt={cartItems?.title}
            />
            <div className="flex-1">
                <h3 className="font-extrabold">{cartItems?.title}</h3>
                <div className="flex items-center gap-2 mt-1">
                    <Button
                        className="w-8 h-8 rounded-full"
                        variant="outline"
                        size="icon"
                        disabled={cartItems?.quantity === 1}
                        onClick = {() => handleUpdateQuantity(cartItems, 'minus')}
                    >
                        <Minus className="w-4 h-4" />
                        <span className="sr-only">Decrease</span>
                    </Button>
                    <span className="font-semibold">{cartItems?.quantity}</span>
                    <Button
                        className="w-8 h-8 rounded-full"
                        variant="outline"
                        size="icon"
                        onClick = {() => handleUpdateQuantity(cartItems, 'plus')}
                    >
                        <Plus className="w-4 h-4" />
                        <span className="sr-only">Decrease</span>
                    </Button>
                </div>
            </div>
            <div className="flex flex-col items-center">
                <p className="font-semibold">
                    {" "}
                    ${(
                        (cartItems?.salePrice > 0
                            ? cartItems?.salePrice
                            : cartItems?.price) * cartItems?.quantity
                    ).toFixed(2)}
                </p>
                <Trash onClick={() => handleCartItemDelete(cartItems)} className="cursor-pointer mt-1" size={20} />
            </div>
        </div>
    );
}

UserCartItemsContent.propTypes = {
    cartItems: PropTypes.array,
};

export default UserCartItemsContent;