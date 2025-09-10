import mongoose from "mongoose";
const bookingSchema = new mongoose.Schema({
     user: {type: String, required: true, ref: 'user'},
     show: {type: String, required: true, ref: 'show'},
     amount: {type: Number, required: true},
     bookSeats: {type: Array, required: true},
     isPaid: {type: Boolean, default: false},
     paymentLink: {type: String},
},{timestamps: true }

)

const Booking=mongoose.model("Booking",bookingSchema);
export default Booking;