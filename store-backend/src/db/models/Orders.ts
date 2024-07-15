import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    _id: Schema.Types.ObjectId,
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    products: [{
        product: { type: Schema.Types.ObjectId, ref: 'Product' },
        quantity: { type: Number, default: 1 }
    }],
    totalAmount: { type: Number, required: true },
    shippingAddress: { type: Schema.Types.ObjectId, ref: 'Address' },
    status: { type: String, enum: ['pending', 'shipped', 'delivered'], default: 'pending' },// 'pending', 'shipped', 'delivered', etc.
    transactionId:{type:Schema.Types.ObjectId,ref:"Transaction",required:true},
    timestamps: { createdAt: { type: Date, default: Date.now }, updatedAt: Date }
});

export default mongoose.model('Order', orderSchema);
