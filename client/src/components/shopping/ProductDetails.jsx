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
import { setProductDetails } from "@/store/shop/products-slice";
import { Label } from "../ui/label";
import StartRating from "../common/Start-rating";
import { useEffect, useState } from "react";
import { addProductReview, getProductReviews } from "@/store/shop/review-slice";

function ProductDetailsDialog({ open, setOpen, productDetails }) {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const { cartItems } = useSelector((state) => state.shoppingCart);
    const { reviews } = useSelector((state) => state.shoppingReview);
    const [reviewMsg, setReviewMsg] = useState("");
    const [rating, setRating] = useState(0);


    function handleAddToCart(getCurrentProductId, getTotalStock) {
        let getCartItems = cartItems.items || [];
        if (getCartItems.length) {
            const indexOfCurrentItem = getCartItems.findIndex(
                (item) => item.productId === getCurrentProductId
            );
            if (indexOfCurrentItem > -1) {
                const getQuantity = getCartItems[indexOfCurrentItem].quantity;
                if (getQuantity + 1 > getTotalStock) {
                    toast(`Only ${getQuantity} quantity can be added for this item`, {
                        style: {
                            backgroundColor: "white",
                            color: "red",
                        },
                    });
                    return;
                }
            }
        }

        dispatch(addtoCart({ userId: user?.id, productId: getCurrentProductId, quantity: 1 }))
            .then((data) => {
                if (data?.payload?.success) {
                    dispatch(fetchCartItems(user?.id));
                    toast.success("Product added to the cart successfully", {
                        style: {
                            background: "white",
                            color: "green",
                        },
                    });
                } else {
                    toast.error("Failed to add product to cart", {
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

    function handleAddReview() {
        dispatch(
            addProductReview({
                productId: productDetails?._id,
                userId: user?.id,
                userName: user?.userName,
                reviewMessage: reviewMsg,
                reviewValue: rating,
            })
        ).then((data) => {
            if (data.payload.success) {
                dispatch(getProductReviews(productDetails?._id));
                toast("Review added successfully", {
                    style: {
                        backgroundColor: "white",
                        color: "green",
                    },
                });
                setReviewMsg("");
                setRating(0);
            }
        });
    }

    useEffect(() => {
        if (productDetails !== null) {
            dispatch(getProductReviews(productDetails?._id))
        }
    }, [productDetails, dispatch]);

    function handleDialogClose() {
        setOpen(false);
        dispatch(setProductDetails());
        setRating(0);
        setReviewMsg("");
    }

    function handleRatingChange(getRating) {
        setRating(getRating);
    }

    const averageReview = reviews.length > 0
            ? reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) / reviews.length
            : 0;
    

    return (
        <Dialog open={open} onOpenChange={handleDialogClose}>
            <DialogContent className="grid lg:grid-cols-2 grid-cols-1 gap-4 p-4 max-w-[90vw] sm:max-w-[70vw] lg:max-w-[50vw] backdrop-blur-lg rounded-xl shadow-lg border border-gray-100 bg-white/95">
                <DialogTitle className="hidden">{productDetails?.title}</DialogTitle>

                {/* Image Section */}
                <div className="relative overflow-hidden group">
                    <img
                        className="w-full object-cover rounded-lg transition-transform duration-500 group-hover:scale-95"
                        src={productDetails?.image}
                        alt={productDetails?.title}
                    />
                </div>

                {/* Content Section */}
                <div className="flex flex-col gap-2">
                    {/* Title and Description */}
                    <div>
                        <h1 className="text-xl font-bold text-gray-900">
                            {productDetails?.title}
                        </h1>
                        <p className="text-muted-foreground mt-1 text-xs">
                            {productDetails?.description}
                        </p>
                    </div>

                    {/* Price Section */}
                    <div className="flex items-center justify-between">
                        <p
                            className={`${
                                productDetails?.salePrice > 0 ? "line-through text-gray-400" : ""
                            } text-md font-bold text-primary`}
                        >
                            Price: ${productDetails?.price}
                        </p>
                        {productDetails?.salePrice > 0 && (
                            <p className="text-md font-bold text-red-600 animate-pulse">
                                Sale Price: ${productDetails?.salePrice}
                            </p>
                        )}
                    </div>

                    {/* Rating Section */}
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-0.5">
                            <StartRating rating={averageReview}/>
                        </div>
                        <span className="text-muted-foreground text-xs">({averageReview})</span>
                    </div>

                    {/* Add to Cart Button */}
                    {productDetails?.totalStock === 0 ? (
                        <Button className="w-full flex items-center justify-center py-1 bg-gray-300 text-gray-700 cursor-not-allowed rounded-md" disabled>
                            <span className="font-semibold text-sm">Out of stock</span>
                            <ShoppingCart className="w-4 h-4 ml-2" />
                        </Button>
                    ) : (
                        <Button
                            onClick={() => handleAddToCart(productDetails?._id, productDetails?.totalStock)}
                            className="w-full flex items-center justify-center py-1 bg-primary hover:bg-primary/90 text-white rounded-md transition-colors duration-300"
                        >
                            <span className="font-semibold text-sm">Add to cart</span>
                            <ShoppingCart className="w-4 h-4 ml-2" />
                        </Button>
                    )}

                    <Separator className="my-2" />

                    {/* Reviews Section */}
                    <div className="max-w-full overflow-auto">
                        <h2 className="text-lg font-bold mb-2 text-gray-900">Reviews</h2>
                        <div className="grid gap-1 items-center">
                            {/* Reviews List */}
                            {reviews && reviews.length > 0 ? (
                                reviews.map((reviewItem) => (
                                    <div key={reviewItem._id} className="flex items-center gap-2 p-1 bg-white rounded-md shadow-sm">
                                        <Avatar className="w-6 h-6">
                                            <AvatarFallback className="font-bold bg-gradient-to-r bg-black text-white text-xs">
                                                {reviewItem?.userName?.charAt(0).toUpperCase()}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="grid gap-0.5">
                                            <div className="flex items-center gap-1">
                                                <h3 className="font-semibold text-xs text-gray-900">{reviewItem?.userName}</h3>
                                            </div>
                                            <div className="flex items-center gap-0.5">
                                                <StartRating rating={reviewItem?.reviewValue} />
                                            </div>
                                            <p className="text-muted-foreground text-xs">{reviewItem?.reviewMessage}</p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <h1 className="text-xs text-gray-500">No reviews yet.</h1>
                            )}

                            {/* Review Input */}
                            <div className="mt-1 flex flex-col gap-1">
                                <Label className="text-xs font-semibold text-gray-900">Write a review</Label>
                                <div className="flex items-center gap-1">
                                    <span className="text-xs text-gray-500">Your rating:</span>
                                    <div className="flex gap-0">
                                        <StartRating rating={rating} handleRatingChange={handleRatingChange} />
                                    </div>
                                </div>
                                <Input
                                    name="reviewMsg"
                                    value={reviewMsg}
                                    onChange={(event) => setReviewMsg(event.target.value)}
                                    placeholder="Share your thoughts..."
                                    className="py-1 px-2 rounded-md outline-none text-xs"
                                />
                                <Button
                                    onClick={handleAddReview}
                                    disabled={reviewMsg.trim() === "" || rating === 0}
                                    className="bg-gradient-to-r rounded-md py-1 px-2 bg-black text-xs"
                                >
                                    Submit
                                </Button>
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