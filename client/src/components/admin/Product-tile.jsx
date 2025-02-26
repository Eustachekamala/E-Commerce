import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import PropTypes from "prop-types";

function AdminProductTile({product, setCurrentEditedId, setOpenCreateProductsDialog, setFormData, handleDeleteProduct}) {
    return (  
        <Card className="w-full max-w-sm mx-auto">
            <div>
                <div className="relative">
                    <div className="h-44 w-44 mx-auto mt-4">
                        <img className="object-cover rounded-t-lg" src={product?.image} alt={product?.title} />
                    </div>
                </div>
            <CardContent>
                <h2 className="text-xl font-bold mb-2 mt-4">{product?.title}</h2>
                <div className="flex justify-between items-center mb-2">
                   <span className={`${product.salePrice > 0 ? 'line-through' : " "} text-lg font-semibold text-primary`}> ${product?.price} </span>
                    {
                        product?.salePrice > 0 ? <span className="text-lg font-bold"> ${product?.salePrice} </span> : null
                    }
                </div>
                {/* <p className="">{product?.description}</p> */}
            </CardContent>
            <CardFooter className="flex justify-between items-center">
                <Button onClick={() => {
                    setOpenCreateProductsDialog(true)
                    setCurrentEditedId(product?._id)
                    setFormData(product)
                }}>Edit</Button>
                <Button onClick={() => handleDeleteProduct(product?._id)}>Delete</Button>
            </CardFooter>
            </div>
        </Card>
    );
}

AdminProductTile.propTypes = {
    product : PropTypes.objectOf,
    setCurrentEditedId: PropTypes.number,
    setOpenCreateProductsDialog : PropTypes.bool,
    setFormData : PropTypes.object,
    handleDeleteProduct : PropTypes.func
}

export default AdminProductTile;