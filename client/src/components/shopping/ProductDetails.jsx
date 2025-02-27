import { DialogTitle } from "@radix-ui/react-dialog";
import { Dialog, DialogContent } from "../ui/dialog";
import PropTypes from "prop-types";
import { Button } from "../ui/button";
import { ShoppingCart, StarIcon } from "lucide-react";
import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Input } from "../ui/input";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { addtoCart, fetchCartItems } from "@/store/shop/cart-slice";

function ProductDetailsDialog({ open, setOpen, productDetails }) {
    const { user } = useSelector(state => state.auth)
    const dispatch = useDispatch()

    function handleAddToCart(getCurrentProductId) {
        console.log(getCurrentProductId);
        dispatch(addtoCart({ userId: user?.id, productId: getCurrentProductId, quantity: 1 }))
            .then((data) => {
                if (data?.payload?.success) {
                    dispatch(fetchCartItems(user?.id));
                    toast.success("Product added to the cart successfully", {
                        style: {
                            background: "white",
                            color: "black",
                        },
                    });
                } else {
                    toast.error("Failed to add product to cart", {
                        style: {
                            background: "white",
                            color: "black",
                        },
                    });
                }
            })
            .catch((error) => {
                console.error("Error adding to cart:", error);
                toast.error("An error occurred while adding to cart", {
                    style: {
                        background: "white",
                        color: "black",
            
                    },
                });
            });
        }


    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="grid lg:grid-cols-2 grid-cols-1 gap-8 sm:p-12 max-w-[80vw] sm:max-w-[60vw] lg:max-w-[50vw] backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-100">
                <DialogTitle className="hidden">{productDetails?.title}</DialogTitle>
            {/* Image Section */}
            <div className="relative overflow-hidden rounded-lg group">
                <img
                    className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    src={productDetails?.image}
                    alt={productDetails?.title}
                    width={600}
                    height={600}
                />
            </div>

                {/* Content Section */}
                <div className="flex flex-col gap-3">
                    {/* Title and Description */}
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-900">
                            {productDetails?.title}
                        </h1>
                        <p className="text-muted-foreground mt-2 leading-relaxed">
                            {productDetails?.description}
                        </p>
                    </div>
                    {/* Price Section */}
                    <div className="flex items-center justify-between">
                        <p className={`${productDetails?.salePrice > 0 ? "line-through" : ""} text-xl font-bold text-primary`}>
                            Price : ${productDetails?.price}
                        </p>
                        {productDetails?.salePrice > 0 && (
                            <p className="text-xl font-bold text-red-600 animate-pulse">
                                Sale Price : ${productDetails?.salePrice}
                            </p>
                        )}
                    </div>
                     <div className="flex items-center gap-2">
                        <div className="flex items-center gap-0.5">
                            <StarIcon className="w-5 h-5 fill-primary"/>
                            <StarIcon className="w-5 h-5 fill-primary"/>
                            <StarIcon className="w-5 h-5 fill-primary"/>
                            <StarIcon className="w-5 h-5 fill-primary"/>
                            <StarIcon className="w-5 h-5"/>
                        </div>
                        <span className="text-muted-foreground">(4.5)</span>
                    </div>
                    {/* Add a Call-to-Action Button */}
                        <Button onClick={() => handleAddToCart(productDetails?._id)} className="w-full flex items-center">
                            <span className="font-semibold">Add to cart</span>
                            <ShoppingCart className="w-6 h-6"/>
                        </Button>
                    <Separator/>
                    {/* Optional: Add a Rating or Review Section */}
                    <div className="max-w-[300px] overflow-auto">
                        <h2 className="text-xl font-bold mb-2">Reviews</h2>
                        <div className="grid gap-6 items-center">
                           <div className="flex gap-4">
                                <Avatar className="w-10 h-10">
                                    <AvatarFallback className="font-bold">
                                        EK
                                    </AvatarFallback>
                                </Avatar>
                            <div className="grid gap-2">
                                <div className="flex items-center gap-2">
                                    <h3 className="font-bold">Eustache Kamala</h3>
                                </div>
                                <div className="flex items-center gap-0.5">
                                    <StarIcon className="w-5 h-5 fill-primary"/>
                                    <StarIcon className="w-5 h-5 fill-primary"/>
                                    <StarIcon className="w-5 h-5 fill-primary"/>
                                    <StarIcon className="w-5 h-5 fill-primary"/>
                                    <StarIcon className="w-5 h-5"/>
                                </div>
                                <p className="text-muted-foreground"> This is an awesome product</p>
                            </div>
                           </div>
                           <div className="mt-2 flex gap-2">
                                <Input placeholder="Write a review...."/>
                                <Button>Submit</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

ProductDetailsDialog.propTypes = {
    open: PropTypes.any,
    setOpen: PropTypes.func,
    productDetails: PropTypes.object,
};

export default ProductDetailsDialog;