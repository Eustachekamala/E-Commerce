import { imageUploadUtil } from "../../helpers/cloudinary.mjs";
import Product from "../../models/ProductModel.mjs"

/**
 * Handles the image upload process.
 *
 * This function takes an image file from the request, converts it to a base64 string,
 * and uploads it using the imageUploadUtil function. It then sends a JSON response
 * indicating the success or failure of the upload.
 *
 * @param {Object} req - The request object, containing the image file in req.file.
 * @param {Object} res - The response object used to send the JSON response.
 * @returns {Promise<void>} - A promise that resolves when the upload process is complete.
 */
export const handleImageUpload = async (req, res) => {
    try {
        // Convert the file buffer to a base64 string
        const b64 = Buffer.from(req.file.buffer).toString('base64');
        const url = `data:${req.file.mimetype};base64,${b64}`;

        // Upload the file to Cloudinary
        const result = await imageUploadUtil(url);

        // Send success response
        res.status(200).json({
            success: true,
            result,
        });
    } catch (error) {
        console.error("Error uploading image:", error);

        // Send error response
        res.status(500).json({
            success: false,
            message: "An error occurred while uploading the image.",
            error: error.message,
        });
    }
};


//add a new product
export const addProduct = async (req, res) => {
    try {
         const { 
            image, 
            title, 
            description, 
            category, 
            brand, 
            price, 
            salePrice, 
            totalStock 
            } = req.body;
        const newlyCreatedProduct = new Product({
            image, 
            title, 
            description, 
            category, 
            brand, 
            price, 
            salePrice, 
            totalStock 
        })

        await newlyCreatedProduct.save();
        res.status(201).json({
            success : true,
            data : newlyCreatedProduct,
            message : "Product created succesfully"
        })

    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Error occured"
        })
    }
}


//fetch a product
export const fetchProducts = async (req, res) => {

    const listOfProducts = await Product.find({});
    res.status(200).json({
        success: true,
        data : listOfProducts
    })

    try {
       
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Error Fetching products"
        })
    }
}

//edit a product
export const editProduct = async (req, res) => {
    const {id} = req.params;
    const { 
            image, 
            title, 
            description, 
            category, 
            brand, 
            price, 
            salePrice, 
            totalStock 
            } = req.body;
    let findProduct = await Product.findById(id);

    if(!findProduct) return res.status(404).json({
        success : false,
        massage : "Product not found"
    })

    findProduct.title = title || findProduct.title;
    findProduct.description = description || findProduct.description;
    findProduct.category = category || findProduct.category;
    findProduct.brand = brand || findProduct.brand;
    findProduct.price = price === '' ? 0 : price || findProduct.price;
    findProduct.salePrice = salePrice === '' ? 0 : salePrice || findProduct.salePrice;
    findProduct.totalStock = totalStock || findProduct.totalStock;
    findProduct.image = image || findProduct.image;

    await findProduct.save();
    res.status(200).json({
        success : true,
        message: "Edited succesfully",
        data : findProduct
    })

    try {

    } catch (error) {
        console.log(error)
        res.json({
            success: false,
            message: "Error occured"
        })
    }
}

//delete a product
export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params
        const product = await Product.findByIdAndDelete(id);

        if(!product)
            return res.status(404).json({
            success : false,
            message : "Product not fount"
        })

        res.status(200).json({
            success : true,
            message : "Product delete successfully"
        })

    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Error occured"
        })
    }
}