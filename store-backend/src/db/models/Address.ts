import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const addressSchema = new Schema({
    _id: Schema.Types.ObjectId,
    street: String,
    city: String,
    state: String,
    zip: String,
    country: String
});

export default mongoose.model('Address', addressSchema);
