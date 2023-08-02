import mongoose, { Schema, Document } from "mongoose";

export interface ProductType extends Document {
  image: string;
  name: string;
  price: number;
  description: string;
  quantity: number
}

const productSchema:Schema = new Schema({
    image: {type:String, required: true},
    name: {type: String, required: true},
    price: {type: Number, required: true},
    description: {type: String, required: true},
    quantity: {type: Number, required: true}
},{
    versionKey: false
});

const ProductModel = mongoose.model<ProductType>("product", productSchema);

export default ProductModel