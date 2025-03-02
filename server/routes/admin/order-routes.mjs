import express from "express"
import { getAllOrdersOfAllUser, getOrdersDetailsForAdmin } from "../../controllers/admin/order-controller.mjs";

const router = express.Router();


router.route('/get').get(getAllOrdersOfAllUser);
router.route('/details/:id').get(getOrdersDetailsForAdmin)

export default router
