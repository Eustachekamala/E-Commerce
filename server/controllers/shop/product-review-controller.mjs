import Review from "../../models/Review.mjs";
import Order from "../../models/Order.mjs";
import Product from "../../models/Product.mjs";

export const addProductReview = async (req, res) => {
    try {
        const { productId, userId, userName, reviewMessage, reviewValue } = req.body;

        // Validate required fields
        if (!productId || !userId || !userName || !reviewMessage || !reviewValue) {
            return res.status(400).json({
                success: false,
                message: "All fields are required: productId, userId, userName, reviewMessage, reviewValue",
            });
        }

        // Check if the user has purchased the product
        const order = await Order.findOne({
            userId,
            "cartItems.productId": productId,
            orderStatus: "confirmed",
        });

        if (!order) {
            return res.status(403).json({
                success: false,
                message: "You need to purchase the product to review it.",
            });
        }

        // Check if the user has already reviewed the product
        const checkExistingReview = await Review.findOne({ productId, userId });

        if (checkExistingReview) {
            return res.status(400).json({
                success: false,
                message: "You have already reviewed this product!",
            });
        }

        // Create a new review
        const newReview = new Review({
            productId,
            userId,
            userName,
            reviewMessage,
            reviewValue,
        });

        await newReview.save();

        // Calculate the average review value
        const reviews = await Review.find({ productId });
        const totalReviewsLength = reviews.length;
        const averageReview = totalReviewsLength > 0
            ? reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) / totalReviewsLength
            : 0;

        // Update the product's average review
        await Product.findByIdAndUpdate(productId, { averageReview });

        // Return success response
        res.status(201).json({
            success: true,
            data: newReview,
        });
    } catch (error) {
        console.error("Error adding product review:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};


export const getProductReviews = async (req, res) => {
    try {
        const { productId } = req.params;

        // Fetch reviews for the product
        const reviews = await Review.find({ productId });

        // Return success response with reviews
        res.status(200).json({
            success: true,
            data: reviews,
        });
    } catch (error) {
        console.error("Error fetching product reviews:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};