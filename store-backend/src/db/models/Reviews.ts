import mongoose from  'mongoose';
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    _id: Schema.Types.ObjectId,
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    comment: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5 },
    timestamps: { createdAt: { type: Date, default: Date.now }, updatedAt: Date }
});
export  default mongoose.model('Review', reviewSchema);
