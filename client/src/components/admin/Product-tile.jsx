import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import PropTypes from "prop-types";

function AdminProductTile({ product, setCurrentEditedId, setOpenCreateProductsDialog, setFormData, handleDeleteProduct }) {
    return (
        <Card className="md:w-64 w-full md:h-80 h-80 mx-auto p-4 my-4 shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="relative">
                {/* Image Container */}
                <div className="h-40 w-40 mx-auto bg-gray-100 rounded-lg flex items-center justify-center">
                    <img
                        className="object-cover rounded-lg h-32 w-32"
                        src={product?.image}
                        alt={product?.title}
                    />
                </div>

                {/* Card Content */}
                <CardContent className="p-4">
                    <h2 className="text-lg font-bold mb-1 truncate">{product?.title}</h2>
                    <div className="flex justify-between items-center mb-2">
                        <span className={`${product.salePrice > 0 ? 'line-through' : ""} text-lg font-semibold text-primary`}>
                            ${product?.price}
                        </span>
                        {product?.salePrice > 0 && (
                            <span className="text-lg font-bold">${product?.salePrice}</span>
                        )}
                    </div>
                </CardContent>

                {/* Card Footer */}
                <CardFooter className="flex justify-between items-center p-0 pb-2">
                    <Button
                        onClick={() => {
                            setOpenCreateProductsDialog(true);
                            setCurrentEditedId(product?._id);
                            setFormData(product);
                        }}
                    >
                        Edit
                    </Button>
                    <Button
                        onClick={() => handleDeleteProduct(product?._id)}
                    >
                        Delete
                    </Button>
                </CardFooter>
            </div>
        </Card>
    );
}

AdminProductTile.propTypes = {
    product: PropTypes.object.isRequired,
    setCurrentEditedId: PropTypes.func.isRequired,
    setOpenCreateProductsDialog: PropTypes.func.isRequired,
    setFormData: PropTypes.func.isRequired,
    handleDeleteProduct: PropTypes.func.isRequired,
};

export default AdminProductTile;