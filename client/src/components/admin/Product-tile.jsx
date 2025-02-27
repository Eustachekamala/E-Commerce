import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import PropTypes from "prop-types";

function AdminProductTile({ product, setCurrentEditedId, setOpenCreateProductsDialog, setFormData, handleDeleteProduct }) {
    return (
        <Card className="w-full max-w-sm mx-auto shadow-lg">
            <div className="relative">
                {/* Image Container */}
                <div className="w-full p-4">
                    <img
                        className="w-full h-auto object-cover rounded-lg"
                        src={product?.image}
                        alt={product?.title}
                    />
                </div>

                {/* Card Content */}
                <CardContent className="p-4">
                    <h2 className="text-xl font-bold mb-2">{product?.title}</h2>
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
                <CardFooter className="flex justify-between items-center p-4">
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