import express from "express";
import { handleImageUpload, addProduct, editProduct, deleteProduct, fetchProducts } from "../../controllers/admin/products-controller.mjs";
import { upload } from "../../helpers/cloudinary.mjs";

const router = express.Router();

router.post('/upload-image', upload.single('my_file'), handleImageUpload);
router.get('/products', fetchProducts);
router.post('/add', addProduct);
router.put('/edit/:id', editProduct);
router.delete('/delete/:id', deleteProduct)

export default router;