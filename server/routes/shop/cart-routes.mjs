import express from "express"
import { addToCart, fetchCartItems, updateCartItemQuantity, deleteCartItem } from "../../controllers/shop/cart-controller.mjs";

const router = express.Router();


router.route('/addToCart').post(addToCart);
router.route('/get/:userId').get(fetchCartItems);
router.route('/update-cart').put(updateCartItemQuantity);
router.route('/:userId/:productId').delete(deleteCartItem);

export default router;