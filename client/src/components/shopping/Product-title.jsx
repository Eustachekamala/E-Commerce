import { brandOptionsMap, categoryOptionsMap } from "@/config";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import PropTypes from "prop-types";
import { ShoppingCart } from "lucide-react";

function ShoppingProductTile({product, handleGetProductDetails}) {
    return ( 
        <Card className="w-full max-w-sm mx-auto p-4 my-4">
            <div onClick={() => handleGetProductDetails(product?._id)}>
                <div className="relative">
                    <div className="h-44 w-44 mx-auto">
                        <img className="object-cover rounded-t-lg" src={product?.image} alt={product?.title} />
                    </div>
                    {
                        product?.salePrice > 0 ? <Badge className="absolute text-white top-2 left-2 bg-red-500 hover:bg-red-600" variant="outline">Sale</Badge> : null
                    }
                </div>
                <CardContent className="p-4">
                    <h2 className="text-xl font-bold mb-2"> {product?.title} </h2>
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-muted-foreground">
                            {
                                categoryOptionsMap[product?.category]
                            }
                        </span>
                        <span className="text-sm text-muted-foreground">
                            {
                                brandOptionsMap[product?.brand]
                            }
                        </span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                        <span className={`${product?.salePrice > 0 ? "line-through" : ""} text-lg font-semibold text-primary`}>${product?.price}</span>
                        {
                            product?.salePrice > 0 ? <span className="text-lg font-semibold text-primary">${product?.salePrice}</span> : null
                        }
                    </div>
                </CardContent>
                <CardFooter>
                    <Button className="w-full flex items-center">
                        <span className="font-semibold">Add to cart</span>
                        <ShoppingCart className="w-6 h-6"/>
                    </Button>
                </CardFooter>
            </div>
        </Card>
     );
}

ShoppingProductTile.propTypes = {
    product : PropTypes.object,
    handleGetProductDetails : PropTypes.func
}

export default ShoppingProductTile;