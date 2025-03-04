import Product from "../../models/Product.mjs"

export const searchProducts = async (req, res) => {
    try {
       
       const { keyword } = req.params;
       if(!keyword){
        return res.status(400).json({
            success : false,
            message : "Keyword is required and must be a string format"
        })
       }

       const regEx = new RegExp(keyword, 'i');

       const createSearchQuery = {
            $or : [
                {title : regEx},
                {description : regEx},
                {category : regEx},
                {brand : regEx},
            ]
       }

       const searchResults = await Product.find(createSearchQuery);

       res.status(200).json({
        success : true,
        data : searchResults
       })
        
    } catch (error) {
        console.log(error);
        res.status(404).json({
            success : false,
            message : "Error"
        })
    }
}