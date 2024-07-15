import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Define Product Schema
const productSchema = new Schema({
	_id: Schema.Types.ObjectId,
	name: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
		min: 0, // Assuming price cannot be negative
	},
	category: {
		type: Schema.Types.ObjectId,
		ref: "Category", // Reference to Category model
		required: true,
	},
	inventoryCount: {
		type: Number,
		required: true,
		min: 0, // Assuming inventory count cannot be negative
	},
	images: {
		type: [String], // Array of image URLs
		required: true,
    },
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: 'Review'
    }],
});

// Compile and export the model
export default mongoose.model('Product', productSchema);
