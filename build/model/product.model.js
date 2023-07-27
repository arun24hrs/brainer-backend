"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoos = require("mongoose");
const productSchema = mongoos.Schema({
    image: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    quantity: { type: Number, required: true }
}, {
    versionKey: false
});
const ProductModel = mongoos.model("product", productSchema);
exports.default = ProductModel;
