import Address from "@/components/shopping/Address";
import img from "../../assets/account.jpg";
import { useSelector } from "react-redux";
import UserCartItemsContent from "@/components/shopping/Cart-items-content";
import { Button } from "@/components/ui/button";

function ShopingCheckout() {
    const { cartItems } = useSelector((state) => state.shoppingCart);

    // Safely calculate the total cart amount
    const totalCartAmount =
        cartItems?.items?.length > 0
            ? cartItems.items.reduce(
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
        <div className="flex flex-col">
            <div className="relative h-[300px] w-full overflow-hidden">
                <img src={img} className="h-full w-full object-cover object-center" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5 p-5">
                <Address />
                <div className="flex flex-col gap-4">
                    {cartItems?.items?.length > 0 ? (
                        cartItems.items.map((item) => (
                            <UserCartItemsContent key={item.productId} cartItem={item} />
                        ))
                    ) : (
                        <p className="text-gray-500">No items in the cart.</p>
                    )}
                    <div className="mt-8 space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="font-bold">Total Price</span>
                            <span className="font-bold">${totalCartAmount.toFixed(2)}</span>
                        </div>
                    </div>
                    <div className="mt-4 w-full">
                        <Button className="w-full">Checkout with Paypal</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ShopingCheckout;