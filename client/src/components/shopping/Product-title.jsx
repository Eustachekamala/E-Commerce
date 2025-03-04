import { brandOptionsMap, categoryOptionsMap } from "@/config";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import PropTypes from "prop-types";
import { ShoppingCart } from "lucide-react";

function ShoppingProductTile({ product, handleGetProductDetails, handleAddToCart }) {
    return (
        <Card className="md:w-64 w-full md:h-80 h-80 mx-auto p-4 my-4 shadow-md hover:shadow-lg transition-shadow duration-300">
            {/* Product Image Section */}
            <div onClick={() => handleGetProductDetails(product?._id)} className="cursor-pointer">
                <div className="relative">
                    <div className="h-40 w-40 mx-auto bg-gray-100 rounded-lg flex items-center justify-center">
                        <img
                            className="object-cover rounded-lg h-32 w-32"
                            src={product?.image}
                            alt={product?.title}
                        />
                    </div>
                    {/* Badges for Stock Status or Sale */}
                    {product?.totalStock === 0 ? (
                        <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600 text-white" variant="outline">
                            Out of stock
                        </Badge>
                    ) : product?.totalStock < 10 ? (
                        <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600 text-white" variant="outline">
                            {`Only ${product?.totalStock} left`}
                        </Badge>
                    ) : product?.salePrice > 0 ? (
                        <Badge className="absolute top-2 left-2 bg-green-500 hover:bg-green-600 text-white" variant="outline">
                            Sale
                        </Badge>
                    ) : null}
                </div>

                {/* Product Details Section */}
                <CardContent className="p-1">
                    <h2 className="text-lg font-bold mb-1 truncate">{product?.title}</h2>
                    <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-muted-foreground">
                            {categoryOptionsMap[product?.category]}
                        </span>
                        <span className="text-sm text-muted-foreground">
                            {brandOptionsMap[product?.brand]}
                        </span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                        <span
                            className={`${
                                product?.salePrice > 0 ? "line-through text-gray-400" : ""
                            } text-md font-semibold text-primary`}
                        >
                            ${product?.price}
                        </span>
                        {product?.salePrice > 0 && (
                            <span className="text-md font-semibold text-primary">
                                ${product?.salePrice}
                            </span>
                        )}
                    </div>
                </CardContent>
            </div>

            {/* Add to Cart Button Section */}
            <CardFooter className="p-0">
                {product?.totalStock === 0 ? (
                    <Button
                        className="w-full flex items-center opacity-65 cursor-not-allowed"
                        disabled
                    >
                        <span className="font-semibold">Out of stock</span>
                        <ShoppingCart className="w-5 h-5 ml-2" />
                    </Button>
                ) : (
                    <Button
                        onClick={() => handleAddToCart(product?._id, product?.totalStock)}
                        className="w-full flex items-center"
                    >
                        <span className="font-semibold">Add to cart</span>
                        <ShoppingCart className="w-5 h-5 ml-2" />
                    </Button>
                )}
            </CardFooter>
        </Card>
    );
}

ShoppingProductTile.propTypes = {
    product: PropTypes.object.isRequired,
    handleGetProductDetails: PropTypes.func.isRequired,
    handleAddToCart: PropTypes.func.isRequired,
};

export default ShoppingProductTile;