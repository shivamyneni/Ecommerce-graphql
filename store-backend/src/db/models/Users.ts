import mongoose from "mongoose";

const { Schema } = mongoose;

// Define User Schema
const UserSchema = new Schema({
	_id: Schema.Types.ObjectId,
	name: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
	address: [{ type: Schema.Types.ObjectId, ref: "Address" }],
	orders: [{ type: Schema.Types.ObjectId, ref: "Order" }],
	savedAddresses: [
		{
			label: { type: String },
			address: { type: Schema.Types.ObjectId, ref: "Address" },
		},
	],
});

// Compile the model and export it
export default mongoose.model('User',UserSchema);
