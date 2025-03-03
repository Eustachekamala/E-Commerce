import express from "express"
import { getAllOrdersOfAllUser, getOrdersDetailsForAdmin, updateOrderStatus } from "../../controllers/admin/order-controller.mjs";

const router = express.Router();


router.route('/get').get(getAllOrdersOfAllUser);
router.route('/details/:id').get(getOrdersDetailsForAdmin);
router.route('/update/:id').put(updateOrderStatus)

export default router
