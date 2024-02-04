import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  name: { type: String, required: true },
});

CategorySchema.virtual('url').get(function () {
  return `/inventory/category/${this._id}`;
});

const category = mongoose.model('Category', CategorySchema);
export default category;
