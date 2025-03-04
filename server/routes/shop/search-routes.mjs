import { searchProducts } from "../../controllers/shop/search-controller.mjs";
import express from "express"


const  router = express.Router();

router.route('/:keyword').get(searchProducts)

export default router