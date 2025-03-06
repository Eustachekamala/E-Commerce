import express from "express";
import { addFeatureImage, getFeatureImages } from "../../controllers/common/feature-controller.mjs";


const router =  express.Router();

router.route('/add').post(addFeatureImage);
router.route('/get').get(getFeatureImages);


export default router