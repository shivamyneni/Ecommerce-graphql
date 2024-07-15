import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
    _id: Schema.Types.ObjectId,
    orderId: { type: Schema.Types.ObjectId, ref: 'Order', required: true },
    type: { type: String, enum: ['payment', 'refund'], required: true },
    status: { type: String, enum: ['success', 'pending', 'failed'], required: true },
    timestamps: { 
        createdAt: { type: Date, default: Date.now, required: true },
        updatedAt: { type: Date, default: Date.now }
    }
});


export default mongoose.model('Transaction', transactionSchema);
