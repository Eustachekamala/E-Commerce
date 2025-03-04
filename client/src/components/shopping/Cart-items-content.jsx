import PropTypes from "prop-types";
import { Button } from "../ui/button";
import { Minus, Plus, Trash } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItem, updateCartQuantity } from "@/store/shop/cart-slice";
import { toast } from "sonner";

function UserCartItemsContent({ cartItem }) {
    const { user } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const { cartItems } = useSelector(state => state.shoppingCart);
    const { productList } = useSelector(state => state.shoppingProducts)

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

    /**
     * Handles the update of the quantity of a cart item.
     * 
     * @param {Object} getCartItem - The cart item to update.
     * @param {string} typeOfAction - The type of action to perform ("plus" or "minus").
     */
    function handleUpdateQuantity(getCartItem, typeOfAction) {
        // Check if the action is to increase the quantity
        if (typeOfAction === "plus") {
            // Get the current cart items
            let getCartItems = cartItems.items || [];
            // Check if there are any cart items
            if (getCartItems.length) {
                // Find the index of the current cart item
                const indexOfCurrentCartItem = getCartItems.findIndex(item => item.productId === getCartItem?.productId);
                // Find the index of the current product in the product list
                const getCurrentProductIndex = productList.findIndex(product => product._id === getCartItem?.productId);
                // Get the total stock of the current product
                const getTotalStock = productList[getCurrentProductIndex].totalStock;
                // Check if the current cart item exists
                if (indexOfCurrentCartItem > -1) {
                    // Get the quantity of the current cart item
                    const getQuantity = getCartItems[indexOfCurrentCartItem].quantity;
                    // Check if the new quantity exceeds the total stock
                    if (getQuantity + 1 > getTotalStock) {
                        // Show a toast message if the quantity exceeds the total stock
                        toast(`Only ${getTotalStock - getQuantity} more of this item can be added`, {
                            style: {
                                backgroundColor: "white",
                                color: "red"
                            },
                        });
                        return;
                    }
                }
            }
        }
        // Dispatch the action to update the cart quantity
        dispatch(updateCartQuantity({
            userId: user?.id,
            productId: getCartItem?.productId,
            quantity: typeOfAction === 'plus' ? getCartItem?.quantity + 1 : getCartItem?.quantity - 1
        })).then(data => {
            // Show a success toast message if the update was successful
            if (data?.payload?.success) {
                toast.success("Cart item is updated", {
                    style: {
                        background: "white",
                        color: "green",
                    },
                });
            } else {
                // Show an error toast message if the update failed
                toast.error("Failed to update cart", {
                    style: {
                        background: "white",
                        color: "red",
                    },
                });
            }
        });
    }

    return (
        <div className="flex items-center space-x-4">
            <img
                className="w-20 h-20 rounded object-cover"
                src={cartItem?.image}
                alt={cartItem?.title}
            />
            <div className="flex-1">
                <h3 className="font-extrabold">{cartItem?.title}</h3>
                <div className="flex items-center gap-2 mt-1">
                    <Button
                        className="w-8 h-8 rounded-full"
                        variant="outline"
                        size="icon"
                        disabled={cartItem?.quantity === 1}
                        onClick = {() => handleUpdateQuantity(cartItem, 'minus')}
                    >
                        <Minus className="w-4 h-4" />
                        <span className="sr-only">Decrease</span>
                    </Button>
                    <span className="font-semibold">{cartItem?.quantity}</span>
                    <Button
                        className="w-8 h-8 rounded-full"
                        variant="outline"
                        size="icon"
                        onClick = {() => handleUpdateQuantity(cartItem, 'plus')}
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
                        (cartItem?.salePrice > 0
                            ? cartItem?.salePrice
                            : cartItem?.price) * cartItem?.quantity
                    ).toFixed(2)}
                </p>
                <Trash onClick={() => handleCartItemDelete(cartItem)} className="cursor-pointer mt-1" size={20} />
            </div>
        </div>
    );
}

UserCartItemsContent.propTypes = {
    cartItem: PropTypes.object,
};

export default UserCartItemsContent;