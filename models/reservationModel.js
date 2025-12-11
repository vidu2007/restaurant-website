import {mongoose, Schema} from "mongoose";

const reservationSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    reservationName: {
        type: String,
        required: true
    },
    contactNumber: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    guests: {
        type: Number,
        required: true
    },
    notes: {
        type: String
    }
});

const Reservations = mongoose.models.reservations || mongoose.model('reservations', reservationSchema);

export default Reservations;