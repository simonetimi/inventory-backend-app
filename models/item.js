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
// possibily remove /inventory/ from link (to be tested)

ItemSchema.virtual('is_in_stock').get(function () {
  return this.number_in_stock === 0 ? false : true;
});

// Export model
const Item = mongoose.model('Item', ItemSchema);
export default Item;
