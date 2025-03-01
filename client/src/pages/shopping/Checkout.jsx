import Address from "@/components/shopping/Address";
import img from "../../assets/account.jpg";
import { useDispatch, useSelector } from "react-redux";
import UserCartItemsContent from "@/components/shopping/Cart-items-content";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { createNewOrder } from "@/store/shop/order-slice";
import { toast } from "sonner";

function ShopingCheckout() {
    const { cartItems } = useSelector((state) => state.shoppingCart);
    const { user } = useSelector((state) => state.auth);
    const { approvalURL } = useSelector((state) => state.shoppingOrder);
    const [currentSeletectedAddress, setCurrentSeletectedAddress] = useState(null);
    // eslint-disable-next-line no-unused-vars
    const [isPaymentStart, setIsPaymentStart] = useState(false);
    const  dispatch = useDispatch();

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

    function handleInitiatePaypalPayment(){

        if(cartItems.length === 0){
            toast("Your cart is empty. Please add Item to proceed",{
                style : {
                    backgroundColor : 'white',
                    color :  "red"
                }
            })
            return
        }

        if(currentSeletectedAddress === null){
            toast("Please select one Address to proceed!",{
                style : {
                    backgroundColor : 'white',
                    color :  "red"
                }
            })
            return
        }

        const orderData = {
            userId : user?.id,
            cartId : cartItems?._id,
            cartItems : cartItems.items.map(singleCartItem => ({
                productId : singleCartItem?.productId,
                title : singleCartItem?.title,
                image : singleCartItem?.image,
                price : singleCartItem?.price,
                salePrice : singleCartItem?.salePrice > 0 ? singleCartItem?.salePrice : singleCartItem?.price,
                quantity : singleCartItem?.quantity
            })),
            addressInfo : {
                addressId : currentSeletectedAddress?._id,
                address : currentSeletectedAddress?.address,
                city : currentSeletectedAddress?.city,
                pincode : currentSeletectedAddress?.pincode,
                phone : currentSeletectedAddress?.pincode,
                notes : currentSeletectedAddress?.notes
            },
            orderStatus : 'pending',
            paymentMethod : 'paypal',
            paymentStatus : 'pending',
            totalAmount : totalCartAmount,
            orderDate : new Date(),
            orderUpadateDate : new Date(),
            paymentId : '',
            payerId : '',
        }
        dispatch(createNewOrder(orderData)).then((data) => {
            console.log(data, "Eustache");
            if(data?.payload?.succes){
                setIsPaymentStart(true)
                toast("", {
                    style : {
                        backgroundColor : "white",
                        color : "green"
                    }
                })
            } else {
                setIsPaymentStart(false)
            }
        })
    }

    if(approvalURL){
        window.location.href = approvalURL;
    }


    return (
        <div className="flex flex-col">
            <div className="relative h-[300px] w-full overflow-hidden">
                <img src={img} className="h-full w-full object-cover object-center" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5 p-5">
                <Address setCurrentSeletectedAddress={setCurrentSeletectedAddress} />
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
                        <Button onClick={handleInitiatePaypalPayment} className="w-full">Checkout with Paypal</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ShopingCheckout;