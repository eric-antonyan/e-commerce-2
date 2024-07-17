import mongoose from 'mongoose';

// Define the schema for favorites
const favoriteSchema = new mongoose.Schema({
    productId: { type: mongoose.Types.ObjectId, required: true }, // productId is a required string
    user: { type: mongoose.Types.ObjectId, required: true }       // user is a required string
}, {
    timestamps: true,  // Adds createdAt and updatedAt fields
    versionKey: false, // Disables the __v field which is used for versioning
    autoIndex: true,   // Automatically create indexes (good for performance)
    strict: true       // Ensures only defined schema paths are saved in the database
});

// Create the model from the schema
const favoritesModel = mongoose.model('Favorite', favoriteSchema);

// Export the model
export default favoritesModel;
