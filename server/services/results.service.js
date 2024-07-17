import mongoose from "mongoose";
import productsModel from "../models/products.model.js";
import usersModel from "../models/users.model.js";

export default (query) => {
    async function searchProducts(searchTerm) {
        try {
            // Case-insensitive search using regex
            const regex = new RegExp(searchTerm, 'i');
            
            // Perform the search query
            const results = await !mongoose.Types.ObjectId.isValid(query) ? productsModel.find({
                $or: [
                    { title: { $regex: regex } },
                    { description: { $regex: regex } }
                    // Add more fields as needed
                ]
            }).exec() : productsModel.find({_id: query}).exec() ;
    
            return results;
        } catch (err) {
            console.error('Error searching products:', err);
            return []; // Return empty array in case of error
        }
    }    

    return searchProducts(query)

}