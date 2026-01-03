import {mongoose, Schema} from "mongoose";

const orderSchema = new Schema({
    userId: {
        type: String,
        required: true,
        select: false
    },
    order: {
        type: Array,
        required: true,
    },
    status: {
        type: String,
        default: 'pending',
    },
    billingAmount: {
        type: Number,
        required: true,
    }
}, {timestamps: true});

const Orders = mongoose.models.orders || mongoose.model('orders', orderSchema);

export default Orders;