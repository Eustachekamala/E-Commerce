import express from "express"
import {createOrder, capturePaymentOrder, getAllOrdersByUser, getOrdersDetails } from "../../controllers/shop/order-controller.mjs"


const router = express.Router();

router.route('/create').post(createOrder);
router.route('/capture').post(capturePaymentOrder);
router.route('/list/:userId').get(getAllOrdersByUser);
router.route('/details/:id').get(getOrdersDetails)

export default router;