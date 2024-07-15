import  mongoose from 'mongoose';
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    _id: Schema.Types.ObjectId,
    name: { type: String, required: true },
    description: String,
    products: [{ type: Schema.Types.ObjectId, ref: 'Product' }]
});

export default mongoose.model('Category', categorySchema);
