import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  price: { type: Number, required: true },
  number_in_stock: { type: Number, required: true },
});

// Virtual for book's URL
ItemSchema.virtual('url').get(function () {
  return `/inventory/item/${this._id}`;
});

ItemSchema.virtual('in_stock').get(function () {
  return this.number_in_stock === 0 ? false : true;
});

// Export model
const item = mongoose.model('Item', ItemSchema);
export default item;
