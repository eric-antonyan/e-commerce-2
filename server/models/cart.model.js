import mongoose from "mongoose";

// Define the schema for favorites
const cartSchema = new mongoose.Schema(
  {
    productId: { 
        type: mongoose.Types.ObjectId, 
        required: true 
    },
    userId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    count: {
        type: Number,
        default: 1
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
    versionKey: false, // Disables the __v field which is used for versioning
    autoIndex: true, // Automatically create indexes (good for performance)
    strict: true, // Ensures only defined schema paths are saved in the database
    collection: "cart",
  }
);

// Create the model from the schema
const cartModel = mongoose.model("Cart", cartSchema);

// Export the model
export default cartModel;
