import express from "express"
import { addProductReview, getProductReviews} from "../../controllers/shop/product-review-controller.mjs"


const router = express.Router();

router.route('/add').post(addProductReview)
router.route('/:productId').get(getProductReviews)

export default router