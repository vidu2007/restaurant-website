import {mongoose, Schema} from "mongoose";

const productSchema = new Schema({
    productName: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String
    },
    img_url: {
        type: String
    }
});

const Products = mongoose.models.Products || mongoose.model('Products', productSchema);

export default Products;