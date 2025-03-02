import Order from "../../models/Order.mjs";
import Cart from "../../models/Cart.mjs"
import paypal from "../../helpers/paypal.mjs";

export const createOrder = async (req, res) => {
    try {
        const {
            userId,
            cartItems,
            addressInfo,
            orderStatus,
            paymentMethod,
            paymentStatus,
            orderDate,
            orderUpadateDate,
            paymentId,
            payerId,
            cartId
        } = req.body;

        // Validate cartItems
        if (!cartItems || !Array.isArray(cartItems)) {
            return res.status(400).json({
                success: false,
                message: "Cart items are required",
            });
        }

        // Calculate the total amount dynamically
        const totalAmount = cartItems.reduce((sum, item) => {
            return sum + (item.price * item.quantity);
        }, 0).toFixed(2);

        console.log("Calculated Total:", totalAmount);

        const create_payment_json = {
            intent: "sale",
            payer: {
                payment_method: "paypal",
            },
            redirect_urls: {
                return_url: "http://localhost:3000/shop/paypal-return",
                cancel_url: "http://localhost:3000/shop/paypal-cancel",
            },
            transactions: [
                {
                    item_list: {
                        items: cartItems.map((item) => ({
                            name: item.title,
                            sku: item.productId,
                            price: item.price.toFixed(2),
                            currency: "USD",
                            quantity: item.quantity,
                        })),
                    },
                    amount: {
                        currency: "USD",
                        total: totalAmount,
                    },
                    description: "Payment for order",
                },
            ],
        };

        paypal.payment.create(create_payment_json, async (error, paymentInfo) => {
            if (error) {
                console.error("PayPal Error:", JSON.stringify(error, null, 2));
                return res.status(500).json({
                    success: false,
                    message: "Error while creating PayPal payment",
                });
            } else {
                const newlyCreatedOrder = new Order({
                    userId,
                    cartId,
                    cartItems,
                    addressInfo,
                    orderStatus,
                    paymentMethod,
                    paymentStatus,
                    totalAmount,
                    orderDate,
                    orderUpadateDate,
                    paymentId,
                    payerId,
                });

                await newlyCreatedOrder.save();

                const approvalURL = paymentInfo.links.find(
                    (link) => link.rel === "approval_url"
                ).href;

                res.status(201).json({
                    success: true,
                    approvalURL,
                    orderId: newlyCreatedOrder._id,
                    message: "Order created successfully",
                });
            }
        });
    } catch (error) {
        console.error("Server Error:", error);
        res.status(500).json({
            success: false,
            message: "Error occurred",
        });
    }
};

export const capturePaymentOrder = async (req, res) => {
  try {
    const {paymentId, payerId, orderId} = req.body;
    let order = await Order.findById(orderId)

    if(!orderId){
        return res.status.json({
            success : false,
            message : "Order can not be found"
        })
    }

    order.paymentStatus = 'paid';
    order.orderStatus = 'confirmed';
    order.paymentId = paymentId;
    order.payerId = payerId

    const getCartId = order.cartId
    await Cart.findByIdAndDelete(getCartId)

    await order.save();

    res.status(200).json({
        success : true,
        message : "Order confirmed",
        data : order
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error Occured",
    });
  }
};


export const getAllOrdersByUser = async (req,res) => {
    try {

            const { userId } = req.params;

            const orders = await Order.find({userId});

            if (!orders.length) {
                return res.status(404).json({
                    success : false,
                    message : "No orders found!"
                })
            }

            res.status(200).json({
                success : true,
                data : orders
            })

    } catch (error) {
        console.log(error);
        res.status(500).json({
        success: false,
        message: "Error Occured",
        });
    }
}





export const getOrdersDetails = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate the ID
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Order ID is required",
      });
    }

    // Fetch the order from the database
    const order = await Order.findById(id);

    // Check if the order exists
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found!",
      });
    }

    // Return the order details
    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    console.error("Error fetching order details:", error);
    res.status(500).json({
      success: false,
      message: "Error occurred while fetching order details",
    });
  }
};