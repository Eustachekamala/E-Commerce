import Cart from "../../models/Cart.mjs";
import Product from "../../models/ProductModel.mjs";


export const addToCart = async (req, res) => {
    try {
        // We get the userId, productId and the quantity the the request body
        const { userId, productId, quantity } = req.body;
        if (!userId || !productId || quantity <= 0) {
            return res.status(400).json({
                success : false,
                message: 'Invalid data provided!'
            })
        }

        // Search the product id
        const product = await Product.findById(productId);
        if(!product){
            return res.status(404).json({
                success : false,
                message : "Product not found"
            })
        }

        //Here we search the userId that made the request add to cart
        let cart = await Cart.findOne({userId});
        // If that user didn't do the the request add to cart, then we can create it 
        // in the statement below
        if(!cart) {
            cart = new Cart({userId, items : []})
        }

        // Here we find the index of the product that the user added to the cart
        const findCurrentProductIndex = cart.items.findIndex(item => item.productId.toString() === productId)
        // If the findIndex succeed, 
        if(findCurrentProductIndex === - 1){
            //in the statement below we will push that product in the array  of cart
            cart.items.push({productId, quantity})
        } else {
            cart.items[findCurrentProductIndex].quantity += quantity
        }

        //Here we save it in the database
        await cart.save()
        res.status(200).json({
            success : true,
            data : cart,
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success : false,
            message : 'Error occured'
        })
    }
}

export const fetchCartItems = async (req, res) => {
    try {
        // Get the userId from request params
        const { userId } = req.params;

        //Check if the user exit
        if(!userId){
            // if not return the message of error
               return res.status(400).json({
                success : false,
                message : 'UserId is mandatory',
            })
        }

        /**
         * The code snippet retrieves a cart document for a 
         * specific user by their `userId` and populates the 
         * `item-productId` field with selected details (`image`,
         *  `title`, `price`, and `salePrice`) from the related 
         * product documents. This ensures that the cart 
         * contains detailed information about each product item 
         * for the user.
         */
        const cart = await Cart.findOne({userId}).populate({
            path : 'items.productId',
            select : 'image title price salePrice'
        })

        // If not cart exited, and then return an error
        if(!cart){
            return res.status(404).json({
                success : false,
                message : 'Cart not found!',
            })
        }

        /**
         * This code filters out items in the `cart` that do not have a `
         * productId` and updates the `cart` with only the 
         * valid items. If any invalid items were removed, 
         * it saves the updated `cart` to the database.
         */
        const validItems = cart.items.filter(item => item.productId);
        if(validItems.length < cart.items.length){
            cart.items = validItems
            await cart.save()
        };

        if (validItems.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No valid items found in the cart",
            });
        }

        // Map valid items to include product details
        const populateCartItems = validItems.map(item => ({
            productId : item.productId._id,
            image : item.productId.image,
            title : item.productId.title,
            price : item.productId.price,
            salePrice : item.productId.salePrice,
            quantity : item.quantity
        }));

        res.status(200).json({
            success : true,
            data : {
                ...cart._doc,
                items : populateCartItems
            }
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success : false,
            message : 'Error occured'
        })
    }
}


export const updateCartItemQuantity = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;
            if (!userId || !productId || quantity <= 0) {
                return res.status(400).json({
                    success : false,
                    message: 'Invalid data provided!'
                })
            }
        
        const cart = await Cart.findOne({userId})
            // If not cart exited, and then return an error
            if(!cart){
                res.status(404).json({
                    success : false,
                    message : 'Cart not found!',
                })
            }

        // Here we find the index of the product that the user added to the cart
        const findCurrentProductIndex = cart.items.findIndex(item => item.productId.toString() === productId);
        if (findCurrentProductIndex === - 1) {
            return res.status(404).json({
                success: fasle,
                message : 'Cart  item not present!'
            })
        }

        //here we save the quantity for the product founded
        cart.items[findCurrentProductIndex].quantity = quantity;
        await cart.save();
        
        /**
         * The code snippet retrieves a cart document for a 
         * specific user by their `userId` and populates the 
         * `item-productId` field with selected details (`image`,
         *  `title`, `price`, and `salePrice`) from the related 
         * product documents. This ensures that the cart 
         * contains detailed information about each product item 
         * for the user.
         */
        await cart.populate({
            path : 'items.productId',
            select : 'image title price salePrice'
        })

        /**
         * This code snippet maps over the `cart.items` array to create a
         *  new array of objects, each containing specific properties 
         * (`productId`, `image`, `title`, `price`, `salePrice`, and `quantity`) 
         * derived from the original `item` objects. It includes conditional 
         * checks to handle cases where certain properties might be missing, 
         * providing default values where necessary.
         */
        const populateCartItems = cart.items.map(item => ({
            productId : item.productId ? item.productId._id : null,
            image : item.productId ? item.productId.image : null,
            title : item.productId ? item.productId.title : 'Product not found',
            price : item.productId ? item.productId.price : null,
            salePrice : item.productId ? item.productId.salePrice : null,
            quantity : item.quantity
        }));

        res.status(200).json({
            success : true,
            data : {
                ...cart._doc,
                items : populateCartItems
            }
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success : false,
            message : 'Error occured'
        })
    }
}


export const deleteCartItem = async (req, res) => {
    try {
        const { userId, productId } = req.params
         if (!userId || !productId ) {
                return res.status(400).json({
                    success : false,
                    message: 'Invalid data provided!'
            });
        };

        const cart = await Cart.findOne({userId}).populate({
            path : 'items.productId',
            select : 'image title price salePrice'
        });

         if(!cart){
                res.status(404).json({
                    success : false,
                    message : 'Cart not found!',
                })
            }

        cart.items = cart.items.filter(item => item.productId._id.toString() !== productId)
        await cart.save();

        await Cart.populate({
            path : 'items.productId',
            select : 'image title price salePrice'
        });

        /**
         * This code snippet maps over the `cart.items` array to create a
         *  new array of objects, each containing specific properties 
         * (`productId`, `image`, `title`, `price`, `salePrice`, and `quantity`) 
         * derived from the original `item` objects. It includes conditional 
         * checks to handle cases where certain properties might be missing, 
         * providing default values where necessary.
         */
        const populateCartItems = cart.items.map(item => ({
            productId : item.productId ? item.productId._id : null,
            image : item.productId ? item.productId.image : null,
            title : item.productId ? item.productId.title : 'Product not found',
            price : item.productId ? item.productId.price : null,
            salePrice : item.productId ? item.productId.salePrice : null,
            quantity : item.quantity
        }));

        res.status(200).json({
            success : true,
            data : {
                ...cart._doc,
                items : populateCartItems
            }
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success : false,
            message : 'Error occured'
        })
    }
}